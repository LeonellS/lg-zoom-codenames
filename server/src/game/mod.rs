mod add_spymaster;
mod card;
mod remove_spymaster;
mod starting_team;

pub use self::card::{generate_cards, Card, CardType};
pub use self::starting_team::StartingTeam;
use crate::message::{ClickCard, GameStart, GameStop, RemoveGame, SendWordList};
use crate::payload::{ClickCardPayload, GameStartPayload, NewGamePayload, NewWordListPayload};
use crate::server::Server;
use crate::spymaster::Spymaster;
use crate::{action, action::Action};
use actix::{
    fut, Actor, ActorContext, ActorFuture, Addr, AsyncContext, ContextFutureSpawner, Running,
    StreamHandler, WrapFuture,
};
use actix_web_actors::ws;
use actix_web_actors::ws::{Message, ProtocolError};
use log::warn;
use std::time::{Duration, Instant};

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

pub struct Game {
    server: Addr<Server>,
    heartbeat: Instant,
    spymasters: Vec<Addr<Spymaster>>,
    starting_team: StartingTeam,
    cards: Vec<Card>,
}

impl Game {
    pub fn new(server: Addr<Server>) -> Self {
        let starting_team: StartingTeam = rand::random();

        Self {
            server,
            heartbeat: Instant::now(),
            spymasters: Vec::new(),
            starting_team,
            cards: self::generate_cards(&starting_team),
        }
    }

    pub fn update_heartbeat(&mut self) {
        self.heartbeat = Instant::now();
    }

    fn heartbeat(&self, context: &mut ws::WebsocketContext<Self>) {
        context.run_interval(HEARTBEAT_INTERVAL, |game, context| {
            if Instant::now().duration_since(game.heartbeat) > CLIENT_TIMEOUT {
                context.stop();
                return;
            }

            context.ping(b"");
        });
    }
}

impl Actor for Game {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, context: &mut Self::Context) {
        self.heartbeat(context);

        self.server
            .send(GameStart {
                game: context.address(),
            })
            .into_actor(self)
            .then(|result, actor, context| {
                if let Ok(code) = result {
                    if let Ok(action) = action::stringify(
                        "game_start",
                        GameStartPayload {
                            code,
                            starting_team: actor.starting_team,
                            cards: actor.cards.clone(),
                        },
                    ) {
                        context.text(action);
                    }
                }

                fut::ready(())
            })
            .wait(context);
    }

    fn stopping(&mut self, context: &mut Self::Context) -> Running {
        self.server.do_send(GameStop {
            game: context.address(),
        });

        for spymaster in &self.spymasters {
            spymaster.do_send(RemoveGame);
        }

        Running::Stop
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for Game {
    fn handle(&mut self, message: Result<Message, ProtocolError>, context: &mut Self::Context) {
        let message = match message {
            Ok(message) => message,
            Err(_) => {
                context.stop();
                return;
            }
        };

        match message {
            Message::Text(message) => {
                let Action { action, payload } = match serde_json::from_str(&message) {
                    Ok(action) => action,
                    Err(_) => {
                        warn!("(game) Received faulty action: {}", message);
                        return;
                    }
                };

                match action.as_str() {
                    "new_game" => {
                        self.starting_team = match self.starting_team {
                            StartingTeam::Red => StartingTeam::Blue,
                            StartingTeam::Blue => StartingTeam::Red,
                        };

                        self.cards = self::generate_cards(&self.starting_team);

                        if let Ok(action) = action::stringify(
                            "new_game",
                            NewGamePayload {
                                starting_team: self.starting_team,
                                cards: self.cards.clone(),
                            },
                        ) {
                            context.text(action);
                        }

                        for spymaster in &self.spymasters {
                            spymaster.do_send(SendWordList {
                                cards: self.cards.clone(),
                            });
                        }
                    }
                    "new_word_list" => {
                        self.cards = self::generate_cards(&self.starting_team);

                        if let Ok(action) = action::stringify(
                            "new_word_list",
                            NewWordListPayload {
                                cards: self.cards.clone(),
                            },
                        ) {
                            context.text(action);
                        }

                        for spymaster in &self.spymasters {
                            spymaster.do_send(SendWordList {
                                cards: self.cards.clone(),
                            });
                        }
                    }
                    "click_card" => {
                        if let Some(payload) = payload {
                            if let Ok(ClickCardPayload { card_uuid }) =
                                serde_json::from_str(&payload)
                            {
                                for card in &mut self.cards {
                                    if card.uuid == card_uuid {
                                        card.turned = true;

                                        for spymaster in &self.spymasters {
                                            spymaster.do_send(ClickCard { card_uuid });
                                        }

                                        break;
                                    }
                                }
                            }
                        }
                    }
                    _ => (),
                }
            }
            Message::Ping(message) => {
                self.update_heartbeat();
                context.pong(&message);
            }
            Message::Pong(_) => {
                self.update_heartbeat();
            }
            Message::Close(reason) => {
                context.close(reason);
                context.stop();
            }
            Message::Continuation(_) => {
                context.stop();
            }
            Message::Binary(_) => (),
            Message::Nop => (),
        }
    }
}

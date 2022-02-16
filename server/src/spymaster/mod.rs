mod click_card;
mod remove_game;
mod send_word_list;

use crate::game::Game;
use crate::message::{JoinGame, RemoveSpymaster, SpymasterStart, SpymasterStop};
use crate::payload::JoinGamePayload;
use crate::server::Server;
use crate::{action, action::Action};
use actix::{
    fut, Actor, ActorContext, ActorFuture, Addr, AsyncContext, ContextFutureSpawner, Running,
    StreamHandler, WrapFuture,
};
use actix_web_actors::ws;
use actix_web_actors::ws::{Message, ProtocolError};
use log::{debug, warn};
use std::time::{Duration, Instant};

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

pub struct Spymaster {
    server: Addr<Server>,
    heartbeat: Instant,
    game: Option<Addr<Game>>,
}

impl Spymaster {
    pub fn new(server: Addr<Server>) -> Self {
        Self {
            server,
            heartbeat: Instant::now(),
            game: None,
        }
    }

    pub fn update_heartbeat(&mut self) {
        self.heartbeat = Instant::now();
    }

    fn heartbeat(&self, context: &mut ws::WebsocketContext<Self>) {
        context.run_interval(HEARTBEAT_INTERVAL, |spymaster, context| {
            if Instant::now().duration_since(spymaster.heartbeat) > CLIENT_TIMEOUT {
                context.stop();
                return;
            }

            context.ping(b"");
        });
    }
}

impl Actor for Spymaster {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, context: &mut Self::Context) {
        self.heartbeat(context);

        self.server.do_send(SpymasterStart {
            spymaster: context.address(),
        });
    }

    fn stopping(&mut self, context: &mut Self::Context) -> Running {
        let address = context.address();

        self.server.do_send(SpymasterStop {
            spymaster: address.clone(),
        });

        if let Some(game) = &self.game {
            game.do_send(RemoveSpymaster {
                spymaster: address.clone(),
            });
        }

        Running::Stop
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for Spymaster {
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
                        warn!("(spymaster) Received faulty action: {}", message);
                        return;
                    }
                };

                match action.as_str() {
                    "join_game" => {
                        if let Some(payload) = payload {
                            if let Ok(JoinGamePayload { code }) = serde_json::from_str(&payload) {
                                self.server
                                    .send(JoinGame {
                                        code,
                                        spymaster: context.address(),
                                    })
                                    .into_actor(self)
                                    .then(|result, actor, context| {
                                        match result {
                                            Ok(Some(game)) => {
                                                actor.game = Some(game.clone());

                                                if let Ok(action) =
                                                    action::stringify_without_payload(
                                                        "join_success",
                                                    )
                                                {
                                                    context.text(action);
                                                }

                                                debug!("game exists!");
                                            }
                                            _ => {
                                                if let Ok(action) =
                                                    action::stringify_without_payload("join_fail")
                                                {
                                                    context.text(action);
                                                }

                                                debug!("game does not exists!");
                                            }
                                        }

                                        fut::ready(())
                                    })
                                    .wait(context);
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

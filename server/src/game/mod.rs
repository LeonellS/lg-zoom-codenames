use crate::action::Action;
use crate::message::{GameStart, GameStop};
use crate::server::Server;
use crate::spymaster::Spymaster;
use actix::{Actor, ActorContext, Addr, AsyncContext, Running, StreamHandler};
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
}

impl Game {
    pub fn new(server: Addr<Server>) -> Self {
        Self {
            server,
            heartbeat: Instant::now(),
            spymasters: Vec::new(),
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

        self.server.do_send(GameStart {
            game: context.address(),
        });
    }

    fn stopping(&mut self, context: &mut Self::Context) -> Running {
        self.server.do_send(GameStop {
            game: context.address(),
        });

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
            Message::Text(message) => match serde_json::from_str::<Action>(&message) {
                Ok(Action { action, payload }) => match action.as_str() {
                    _ => (),
                },
                Err(_) => {
                    warn!("Received faulty action: {}", message);
                }
            },
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

use crate::action::Action;
use crate::message::{SpymasterStart, SpymasterStop};
use crate::server::Server;
use actix::{Actor, ActorContext, Addr, AsyncContext, Running, StreamHandler};
use actix_web_actors::ws;
use actix_web_actors::ws::{Message, ProtocolError};
use log::warn;
use std::time::{Duration, Instant};

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

pub struct Spymaster {
    server: Addr<Server>,
    heartbeat: Instant,
}

impl Spymaster {
    pub fn new(server: Addr<Server>) -> Self {
        Self {
            server,
            heartbeat: Instant::now(),
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
        self.server.do_send(SpymasterStop {
            spymaster: context.address(),
        });

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

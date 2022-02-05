use super::Server;
use crate::message::SpymasterStop;
use actix::Handler;
use log::debug;

impl Handler<SpymasterStop> for Server {
    type Result = ();

    fn handle(&mut self, SpymasterStop { spymaster }: SpymasterStop, _context: &mut Self::Context) {
        self.spymasters.retain(|v| *v != spymaster);

        debug!("(end) spymasters: {}", self.spymasters.len());
    }
}

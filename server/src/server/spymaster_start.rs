use crate::message::SpymasterStart;
use super::Server;
use actix::Handler;
use log::debug;

impl Handler<SpymasterStart> for Server {
    type Result = ();

    fn handle(
        &mut self,
        SpymasterStart { spymaster }: SpymasterStart,
        _context: &mut Self::Context,
    ) {
        self.spymasters.push(spymaster);

        debug!("(start) spymasters: {}", self.spymasters.len());
    }
}

use super::Game;
use crate::message::RemoveSpymaster;
use actix::Handler;
use log::debug;

impl Handler<RemoveSpymaster> for Game {
    type Result = ();

    fn handle(
        &mut self,
        RemoveSpymaster { spymaster }: RemoveSpymaster,
        _context: &mut Self::Context,
    ) {
        self.spymasters.retain(|v| *v != spymaster);

        debug!("spymasters (remove): {}", self.spymasters.len());
    }
}

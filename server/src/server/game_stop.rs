use crate::message::GameStop;
use super::Server;
use actix::Handler;
use log::debug;

impl Handler<GameStop> for Server {
    type Result = ();

    fn handle(&mut self, GameStop { game }: GameStop, _context: &mut Self::Context) {
        self.games.retain(|_, v| *v != game);

        debug!("(stop) games: {:?}", self.games.keys());
    }
}

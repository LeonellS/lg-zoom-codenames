use super::Game;
use crate::message::{AddSpymaster, SendWordList};
use actix::Handler;
use log::debug;

impl Handler<AddSpymaster> for Game {
    type Result = ();

    fn handle(&mut self, AddSpymaster { spymaster }: AddSpymaster, _context: &mut Self::Context) {
        self.spymasters.push(spymaster.clone());

        debug!("spymasters (add): {}", self.spymasters.len());

        spymaster.do_send(SendWordList {
            cards: self.cards.clone(),
        });
    }
}

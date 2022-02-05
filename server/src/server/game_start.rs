use super::Server;
use crate::message::GameStart;
use actix::{Handler, MessageResult};
use log::debug;

impl Handler<GameStart> for Server {
    type Result = MessageResult<GameStart>;

    fn handle(
        &mut self,
        GameStart { game }: GameStart,
        _context: &mut Self::Context,
    ) -> Self::Result {
        let mut code = self.create_code();

        while self.games.keys().any(|k| *k == code) {
            code = self.create_code();
        }

        self.games.insert(code.clone(), game);

        debug!("(start) games: {:?}", self.games.keys());

        MessageResult(code)
    }
}

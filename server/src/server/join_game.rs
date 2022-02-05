use crate::message::{AddSpymaster, JoinGame};
use super::Server;
use actix::{Handler, MessageResult};
use log::debug;

impl Handler<JoinGame> for Server {
    type Result = MessageResult<JoinGame>;

    fn handle(
        &mut self,
        JoinGame { code, spymaster }: JoinGame,
        _context: &mut Self::Context,
    ) -> Self::Result {
        if let Some(game) = self.games.get(&code) {
            debug!("game exists: {}", &code);

            game.do_send(AddSpymaster { spymaster });

            return MessageResult(Some(game.clone()));
        }

        debug!("game does not exists: {}", &code);

        MessageResult(None)
    }
}

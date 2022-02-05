use super::Spymaster;
use crate::action;
use crate::message::RemoveGame;
use actix::Handler;

impl Handler<RemoveGame> for Spymaster {
    type Result = ();

    fn handle(&mut self, _message: RemoveGame, context: &mut Self::Context) {
        self.game = None;

        if let Ok(action) = action::stringify_without_payload("game_disconnect") {
            context.text(action);
        }
    }
}

use super::Spymaster;
use crate::action;
use crate::action::SendWordListAction;
use crate::message::SendWordList;
use actix::Handler;

impl Handler<SendWordList> for Spymaster {
    type Result = ();

    fn handle(&mut self, SendWordList { cards }: SendWordList, context: &mut Self::Context) {
        if let Ok(action) = action::stringify("send_word_list", SendWordListAction { cards }) {
            context.text(action);
        }
    }
}

use super::Spymaster;
use crate::action;
use crate::message::SendWordList;
use crate::payload::SendWordListPayload;
use actix::Handler;

impl Handler<SendWordList> for Spymaster {
    type Result = ();

    fn handle(&mut self, SendWordList { cards }: SendWordList, context: &mut Self::Context) {
        if let Ok(action) = action::stringify("send_word_list", SendWordListPayload { cards }) {
            context.text(action);
        }
    }
}

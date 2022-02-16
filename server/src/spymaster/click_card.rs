use super::Spymaster;
use crate::action;
use crate::message::ClickCard;
use crate::payload::ClickCardPayload;
use actix::Handler;

impl Handler<ClickCard> for Spymaster {
    type Result = ();

    fn handle(&mut self, ClickCard { card_uuid }: ClickCard, context: &mut Self::Context) {
        if let Ok(action) = action::stringify("click_card", ClickCardPayload { card_uuid }) {
            context.text(action);
        }
    }
}

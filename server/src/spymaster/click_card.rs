use super::Spymaster;
use crate::message::ClickCard;
use crate::{action, action::ClickCardAction};
use actix::Handler;

impl Handler<ClickCard> for Spymaster {
    type Result = ();

    fn handle(&mut self, ClickCard { card_uuid }: ClickCard, context: &mut Self::Context) {
        if let Ok(action) = action::stringify("click_card", ClickCardAction { card_uuid }) {
            context.text(action);
        }
    }
}

import { Card } from '../game/card'
import { StartingTeam } from '../game/team'

interface Action {
    action: string
    payload: string | null
}

interface GameStartAction {
    code: string
    startingTeam: StartingTeam
    cards: Card[]
}

interface NewGameAction {
    startingTeam: StartingTeam
    cards: Card[]
}

interface NewWordListAction {
    cards: Card[]
}

interface ClickCardAction {
    cardUuid: string
}

interface SendWordListAction {
    cards: Card[]
}

interface JoinGameAction {
    code: string
}

function stringifyAction(
    action: string,
    payload: object | null = null
): string {
    const actionObject: Action = {
        action: action,
        payload: JSON.stringify(payload),
    }

    return JSON.stringify(actionObject)
}

export {
    Action,
    stringifyAction,
    GameStartAction,
    NewGameAction,
    NewWordListAction,
    ClickCardAction,
    SendWordListAction,
    JoinGameAction,
}

interface Action {
    action: string
    payload: string
}

interface GameStartAction {
    code: string
    startingTeam: string
    cards: string[]
}

interface NewGameAction {
    startingTeam: string
    cards: string[]
}

interface NewWordListAction {
    cards: string[]
}

interface ClickCardAction {
    cardUuid: string
}

interface SendWordListAction {
    cards: string[]
}

interface JoinGameAction {
    code: string
}

function stringifyAction(action: string, payload: object): string {
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

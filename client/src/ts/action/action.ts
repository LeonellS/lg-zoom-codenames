interface Action {
    action: string
    payload: string | null
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

export { Action, stringifyAction }

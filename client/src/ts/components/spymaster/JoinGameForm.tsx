import React, { ReactElement, useState } from 'react'
import { stringifyAction } from '../../action/action'
import { JoinGamePayload } from '../../action/payload'
import { createNotification } from '../../store/notification'
import { useAppDispatch } from '../../store/store'

interface Props {
    ws: WebSocket | null
}

const JoinGameForm = ({ ws }: Props): ReactElement => {
    const dispatch = useAppDispatch()

    const [code, setCode] = useState('')

    function handleJoin(): void {
        const payload: JoinGamePayload = {
            code: code.toUpperCase(),
        }

        if (ws === null) {
            dispatch(createNotification('Not connected to the server'))
            return
        }

        ws.send(stringifyAction('join_game', payload))
    }

    return (
        <div className="spymaster__form">
            <div className="form">
                <div className="input__container">
                    <label htmlFor="code" className="input__label">
                        Game Code
                    </label>
                    <input
                        type="text"
                        id="code"
                        className="input"
                        maxLength={4}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <button
                    className="button button--large button--primary"
                    onClick={handleJoin}
                >
                    Join
                </button>
            </div>
        </div>
    )
}

export default JoinGameForm

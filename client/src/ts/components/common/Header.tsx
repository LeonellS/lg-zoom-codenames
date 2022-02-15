import React, { ReactElement } from 'react'
import { useAppSelector } from '../../store/store'
import GameMenu from '../game/GameMenu'

interface Props {
    forGame: boolean
}

const Header = ({ forGame }: Props): ReactElement => {
    const code = useAppSelector((state) => state.game.code)

    return (
        <div className="header">
            <a href="/" className="header__title">
                Screen Share Codenames
            </a>
            {forGame && <GameMenu code={code} />}
        </div>
    )
}

export default Header

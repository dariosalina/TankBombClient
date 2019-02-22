import {combineReducers} from 'redux'
import playerReducer from './player'
import otherPlayerReducer from './otherplayer'
import createPlayersID from './addPlayerID'
import mineReducer from './mines'
import explosionReducer from './explosion'
import flagReducer from './flag'
import scoreReducer from './score'

const reducer = combineReducers ({
    playersID: createPlayersID,
    player: playerReducer,
    otherPlayer: otherPlayerReducer,
    mines: mineReducer,
    explosion: explosionReducer,
    flag: flagReducer,
    score: scoreReducer
})

export default reducer
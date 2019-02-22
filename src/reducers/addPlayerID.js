export default function createPlayersID(state = {}, action){
    switch(action.type) {
        case 'ADD_PLAYERID':    
            return action.payload
        default:
            return state
}
}
export default function explosionReducer(state = {}, action){
    switch(action.type) {
        case "EXPLOSION":    
            return action.payload
        case "EXPLOSION_OTHERPLAYER":
            return action.payload
        default:
            return state
}
}
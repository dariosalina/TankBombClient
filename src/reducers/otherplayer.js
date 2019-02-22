const inititalState = {
    position: [200,200],
    direction : ''
}


const otherPlayerReducer = (state = inititalState, action) => {


    switch(action.type) {
        case 'MOVE_OTHERPLAYER':
            return action.payload
        
        default:  
            return state
    }
}

export default otherPlayerReducer
const inititalState = {
    position: [200,200],
    direction : ''
}



const playerReducer = (state = inititalState, action) => {
    switch(action.type) {
        case 'MOVE_PLAYER':
            return {
                ...action.payload
            }
        default:  
            return state
    }
}

export default playerReducer

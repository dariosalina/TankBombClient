const inititalState = {
  mines: []
};

const mineReducer = (state = inititalState.mines, action) => {
  switch (action.type) {
    case "DROP_MINE":
      return [...state, action.payload];
    case "DROP_MINE_OTHERPLAYER":
      return [...state, action.payload]
    default:
      return state;
  }
};

export default mineReducer;

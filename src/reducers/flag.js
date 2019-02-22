
  
  const flagReducer = (state = [], action) => {
    switch (action.type) {
      case "POSITION_FLAG":
        return action.payload.position;
    default:
        return state;
    }
  };
  
  export default flagReducer;
  
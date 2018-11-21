function tripsReducer(state = [], action){
  switch(action.type){
    case 'LOADING_TRIPS':
      return state
    case "FETCH_TRIPS":
      return [...action.payload]
    default:
      return state
  }
}

export default tripsReducer

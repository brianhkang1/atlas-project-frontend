export function tripReducer(state = [], action){
  switch(action.type){
    case 'FETCHING_TRIP':
      return state
    case "ADD_FETCHED_TRIP":
      return action.payload
    default:
      return state
  }
}

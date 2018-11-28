export function tripsReducer(state = [], action){
  switch(action.type){
    case 'FETCHING_TRIPS':
      return state
    case "ADD_FETCHED_TRIPS":
      return [...action.payload]
    default:
      return state
  }
}

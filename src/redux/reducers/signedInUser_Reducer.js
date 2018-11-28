export function signedInUserReducer(state = [], action){
  switch(action.type){
    case 'FETCHING_SIGNEDINUSER':
      return state
    case "ADD_FETCHED_SIGNEDINUSER":
      return [action.payload]
    case "LOGOUT":
      return []
    default:
      return state
  }
}

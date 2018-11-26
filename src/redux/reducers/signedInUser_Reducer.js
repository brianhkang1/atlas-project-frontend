function signedInUser(state = [], action){
  switch(action.type){
    case 'FETCHING_SIGNEDINUSER':
      return state
    case "ADD_FETCHED
  }_SIGNEDINUSER":
      return [action.payload]
    case "LOGOUT":
      return []
    default:
      return state
  }
}

export default signedInUser

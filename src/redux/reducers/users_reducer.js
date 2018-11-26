function users(state = [], action){
  switch(action.type){
    case 'FETCHING_USERS':
      return state
    case "ADD_FETCHED_USERS":
      return [action.payload]
    default:
      return state
  }
}

export default users

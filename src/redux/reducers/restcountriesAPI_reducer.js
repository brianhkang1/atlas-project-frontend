export function restcountriesAPIReducer(state = [], action){
  switch(action.type){
    case 'FETCHING_RESTCOUNTRIESAPI':
      return state
    case "ADD_FETCHED_RESTCOUNTRIESAPI":
      return [...action.payload]
    default:
      return state
  }
}

import { combineReducers } from 'redux'
import { tripsReducer } from './trips_reducer.js'
import { signedInUserReducer } from './signedInUser_Reducer.js'
import { usersReducer } from './users_reducer'
import { restcountriesAPIReducer } from './restcountriesAPI_reducer'

const rootReducer = combineReducers({
    signedInUser: signedInUserReducer,
    trips: tripsReducer,
    users: usersReducer,
    restcountriesAPI: restcountriesAPIReducer
  }
)

export default rootReducer

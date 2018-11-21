import { combineReducers } from 'redux'
import tripsReducer from './trips_reducer.js'

const rootReducer = combineReducers(
  {trips: tripsReducer}
)

export default rootReducer

export function fetchTrip(tripId) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_TRIP' });
    return fetch(`http://localhost:3000/api/v1/trips/${tripId}`)
      .then(response => response.json())
      .then(trip => {
        dispatch({ type: 'ADD_FETCHED_TRIP', payload: trip})});
  };
}

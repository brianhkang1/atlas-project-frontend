export function fetchTrip(tripId) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_TRIP' });
    return fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/trips/${tripId}`)
      .then(response => response.json())
      .then(trip => {
        dispatch({ type: 'ADD_FETCHED_TRIP', payload: trip})});
  };
}

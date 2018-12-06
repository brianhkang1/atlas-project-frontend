export function fetchAllTrips() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_TRIPS' });
    return fetch(`https://atlas-demo-backend.herokuapp.com/api/v1/trips`)
      .then(response => response.json())
      .then(trips => {
        dispatch({ type: 'ADD_FETCHED_TRIPS', payload: trips})});
  };
}

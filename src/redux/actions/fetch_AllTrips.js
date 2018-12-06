export function fetchAllTrips() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_TRIPS' });
    return fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/trips`)
      .then(response => response.json())
      .then(trips => {
        dispatch({ type: 'ADD_FETCHED_TRIPS', payload: trips})});
  };
}

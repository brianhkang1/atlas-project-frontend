export function fetchSignedInUser() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_SIGNEDINUSER' });
    return fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/profile`, {
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
      .then(response => response.json())
      .then(json => dispatch({ type: 'ADD_FETCHED_SIGNEDINUSER', payload: json.user}));
  };
}

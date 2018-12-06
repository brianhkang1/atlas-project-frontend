export function fetchSignedInUser() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_SIGNEDINUSER' });
    return fetch(`https://atlas-demo-backend.herokuapp.com/api/v1/profile`, {
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
      .then(response => response.json())
      .then(json => dispatch({ type: 'ADD_FETCHED_SIGNEDINUSER', payload: json.user}));
  };
}

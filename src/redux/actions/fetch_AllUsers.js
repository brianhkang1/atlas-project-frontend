export function fetchAllUsers() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_USERS' });
    return fetch(`https://atlas-demo-backend.herokuapp.com/api/v1/users`)
      .then(response => response.json())
      .then(users => dispatch({ type: 'ADD_FETCHED_USERS', payload: users}));
  };
}

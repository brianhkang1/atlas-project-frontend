export function fetchAllUsers() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_USERS' });
    return fetch(`http://localhost:3000/api/v1/users`)
      .then(response => response.json())
      .then(users => dispatch({ type: 'ADD_FETCHED_USERS', payload: users}));
  };
}

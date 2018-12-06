export function fetchAllUsers() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_USERS' });
    return fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users`)
      .then(response => response.json())
      .then(users => dispatch({ type: 'ADD_FETCHED_USERS', payload: users}));
  };
}

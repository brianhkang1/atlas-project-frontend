export function signInUser(userInfo){
  return (dispatch) => {
    dispatch({type: "ADD_FETCHED_SIGNEDINUSER", payload: userInfo})
  }
}

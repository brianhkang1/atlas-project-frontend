export function logout() {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' })
  }
}

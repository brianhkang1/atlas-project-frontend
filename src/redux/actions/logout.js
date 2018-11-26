export function logout() {
  return (dispatch) => {
    localStorage.clear()
    dispatch({ type: 'LOGOUT' })
  }
}

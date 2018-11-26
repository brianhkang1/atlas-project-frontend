export function signInUser(userInfo){
if(userInfo){
  this.setState({signedInUser: userInfo})
  } else {alert("Incorrect username or password")}
}

import React from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signInUser } from '../redux/actions/signInUser'

class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      password_confirm: ""
    }
  }

  handleChange = (event, data) => {
    this.setState({
      [event.target.name]: data.value
    })
  }

  handleSubmit = (event, routerProps) => {
    event.preventDefault()

    if (this.state.password !== this.state.password_confirm) {
      alert("Password and Password Confirmation do not match")
    } else {
      this.postNewUser()
    }
  }

  postNewUser = () => {
    let body = {
      user: {
        username: this.state.username,
        password: this.state.password,
      }
    }

    fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.jwt)
        this.props.signInUser(json.user, this.props.router)
      })
    }

  render(){
    return(
      <div className="centered signup-login-background">
      <Segment id="signup-form">
        <Form size='large' onSubmit={(event) => this.handleSubmit(event, this.props.router)}>
          <Form.Input required icon='user' iconPosition='left' name="username" placeholder='create a username' onChange={this.handleChange} />
          <Form.Input required icon='lock' iconPosition='left' name="password" placeholder='create a password' type='password' onChange={this.handleChange} />
          <Form.Input required icon='lock' iconPosition='left' name="password_confirm" placeholder='confirm your password' type='password' onChange={this.handleChange} />

          <Button color="blue" fluid size='large'>Signup</Button>
        </Form>
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {signedInUser: state.signedInUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (userInfo) => dispatch(signInUser(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

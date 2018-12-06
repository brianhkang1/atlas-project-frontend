import React from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signInUser } from '../redux/actions/signInUser'

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`

class Signup extends React.PureComponent {
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
      this.postNewUser(routerProps)
    }
  }

  postNewUser = (routerProps) => {
    let body = {
      user: {
        username: this.state.username,
        password: this.state.password,
      }
    }

    fetch(`${BASE_URL}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(json => {
        if(!json.jwt || !json.user ){
          alert("Username already taken")
        } else {
          localStorage.setItem("token", json.jwt)
          this.props.signInUser(json.user)
          routerProps.history.push("/search_trips")
        }
      })
    }

  render(){
    return(
      <div id="signup-page">
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

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (userInfo) => dispatch(signInUser(userInfo))
  }
}

export default connect(null, mapDispatchToProps)(Signup)

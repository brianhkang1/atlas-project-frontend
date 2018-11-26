import React, { Component } from 'react'
import { Menu, Sidebar } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/logout'

class MainHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeItem: ''
    }
  }

  handleLogoutClick = (event, routerProps) => {
    localStorage.clear()
    this.props.logout()
    routerProps.history.push("/")
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Sidebar as={Menu} visible vertical inverted borderless size="large" id="main-header">
        <Menu.Item id="header-title" header as={ NavLink } exact to="/"
          align="right"
          name="PENDING TITLE"
          active={activeItem === 'PENDING TITLE'}
          onClick={this.handleItemClick}
        />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item className="menu-item" as={ NavLink } to="/about"
          align="right"
          name='ABOUT'
          active={activeItem === 'ABOUT'}
          onClick={this.handleItemClick}
        />
        <Menu.Item className="menu-item" as={ NavLink } to="/map"
          align="right"
          name='SEE YOUR MAP'
          active={activeItem === 'SEE YOUR MAP'}
          onClick={this.handleItemClick}
        />
        <Menu.Item className="menu-item" as={ NavLink } to="/liked_trips"
          align="right"
          name='SEE ALL TRIPS'
          active={activeItem === 'SEE ALL TRIPS'}
          onClick={this.handleItemClick}
        />
        <Menu.Item className="menu-item" as={ NavLink } to="/form"
          align='right'
          name='POST A TRIP'
          active={activeItem === 'POST A TRIP'}
          onClick={this.handleItemClick}
        />
        {this.props.signedInUser.length === 0 ?
          <React.Fragment>
            <Menu.Item className="menu-item" as={ NavLink } to="/login"
            align="right"
            name='LOG IN'
            active={activeItem === 'LOG IN'}
            onClick={this.handleItemClick}
            />
            <Menu.Item className="menu-item" as={ NavLink } to="/signup"
            align='right'
            name='SIGN UP'
            active={activeItem === 'SIGN UP'}
            onClick={this.handleItemClick}
            />
          </React.Fragment>
          :
          <Menu.Item className="menu-item"
          align="right"
          name='LOG OUT'
          active={activeItem === 'LOG OUT'}
          onClick={(event) => this.handleLogoutClick(event, this.props.router)}
          />
        }
      </Sidebar>
    )
  }
}

const mapStateToProps = (state) => {
  return {signedInUser: state.signedInUser}
}

const mapDispatchToProps = (dispatch) => {
  return {logout: () => dispatch(logout())}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainHeader))

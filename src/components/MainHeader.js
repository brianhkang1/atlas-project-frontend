import React from 'react'
import { Menu, Sidebar } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/logout'

class MainHeader extends React.PureComponent {
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

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Sidebar as={Menu} visible vertical inverted borderless size="large" id="main-header">
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        {this.props.signedInUser.length === 0 ? null :
        <Menu.Item className="menu-item" align="right" name={`WELCOME ${this.props.signedInUser[0].username.toUpperCase()}`}/>
        }
        <Menu.Item className="menu-item" as={ NavLink } exact to="/"
          align="right"
          name='HOME'
          active={activeItem === 'HOME'}
          onClick={this.handleItemClick}
        />
        <Menu.Item className="menu-item" as={ NavLink } to="/map"
          align="right"
          name='YOUR MAP'
          active={activeItem === 'YOUR MAP'}
          onClick={this.handleItemClick}
        />
        <Menu.Item className="menu-item" as={ NavLink } to="/search_trips"
          align="right"
          name='SEARCH TRIPS'
          active={activeItem === 'SEARCH TRIPS'}
          onClick={this.handleItemClick}
        />
        <Menu.Item className="menu-item" as={ NavLink } to="/liked_trips"
          align="right"
          name='TRIPS YOU LIKED'
          active={activeItem === 'TRIPS YOU LIKED'}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)

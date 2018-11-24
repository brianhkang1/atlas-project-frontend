import React, { Component } from 'react'
import { Menu, Sidebar } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class MainHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeItem: ''
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Sidebar as={Menu} visible vertical borderless id="main-header">
        <Menu.Item id="header-title" header as={NavLink} exact to="/"
          name="PENDING TITLE"
          active={activeItem === 'PENDING TITLE'}
          onClick={this.handleItemClick}
        />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item className="menu-item" as={ NavLink } to="/about"
          name='ABOUT'
          active={activeItem === 'ABOUT'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ NavLink } to="/map"
          className="menu-item"
          name='SEE YOUR MAP'
          active={activeItem === 'SEE YOUR MAP'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ NavLink } to="/liked_trips"
          className="menu-item"
          name='SEE ALL TRIPS'
          active={activeItem === 'SEE ALL TRIPS'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ NavLink } to="/trips_form"
          className="menu-item"
          name='POST A TRIP'
          active={activeItem === 'POST A TRIP'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ NavLink } to="/login"
          position="bottom"
          className="menu-item"
          name='LOG IN'
          active={activeItem === 'LOG IN'}
          onClick={this.handleItemClick}
        />
      </Sidebar>
    )
  }
}

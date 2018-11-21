import React, { Component } from 'react'
import { Menu, Sidebar} from 'semantic-ui-react'
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
      <Sidebar as={Menu} vertical pointing visible size='large' id="main-header">
        <Menu.Item id="header-title" header as={NavLink} exact to="/"
          name="pending title"
          active={activeItem === 'pending title'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ NavLink } to="/about"
          name='about'
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ NavLink } to="/map"
          name='see your map'
          active={activeItem === 'see your map'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ NavLink } to="/liked_trips"
          name='liked trips'
          active={activeItem === 'liked trips'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ NavLink } to="/trips_form"
          name='post a trip'
          active={activeItem === 'post a trip'}
          onClick={this.handleItemClick}
        />
      </Sidebar>
    )
  }
}

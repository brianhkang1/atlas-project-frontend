import React from 'react'
import { Input } from 'semantic-ui-react'

const Searchbar = (props) => {
  return(
    <Input
      focus
      id="searchbar"
      icon='search'
      iconPosition="left"
      placeholder="Search by Country"
      onChange={props.handleInputChange}
    />
  )
}

export default Searchbar;

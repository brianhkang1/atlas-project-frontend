import React from 'react'
import { Input } from 'semantic-ui-react'

const Searchbar = (props) => {
  return(
    <Input
      focus
      id="searchbar"
      icon='search'
      size="big"
      iconPosition="left"
      placeholder="Search by Country"
      onChange={props.handleInputChange}
      value={props.searchInput}
    />
  )
}

export default Searchbar;

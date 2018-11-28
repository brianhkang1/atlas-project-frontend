import React from 'react'

class Trip extends React.Component{
  render(){
    return(
      <div>{this.props.trip.summary}</div>
    )
  }
}

export default Trip

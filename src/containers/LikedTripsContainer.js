import React from 'react'
import Trip from '../components/Trip'
import { connect } from 'react-redux'

class LikedTripsContainer extends React.Component{
  render(){
    return(
      <React.Fragment>
        {
          this.props.signedInUser.length === 0 ? null :
          this.props.signedInUser[0].liked_trips.map(trip => {
            return <Trip key={trip.id} trip={trip} router={this.props.router}/>
          })
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {signedInUser: state.signedInUser}
}

export default connect(mapStateToProps)(LikedTripsContainer)

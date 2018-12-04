import React from 'react'
import Trip from '../components/Trip'
import { connect } from 'react-redux'
import { fetchAllTrips } from '../redux/actions/fetch_AllTrips'
import { Grid, Segment } from 'semantic-ui-react'

class LikedTripsContainer extends React.Component{
  componentDidMount(){
    this.props.fetchAllTrips()
  }

  renderLikedTrips = () => {
    let likedTripObjects = []
    let likedTripIds = this.props.signedInUser[0].liked_trips.map(trip => trip.id)

    likedTripIds.forEach(likedId => {
      likedTripObjects.push(this.props.tripsList.find(trip => trip.id === likedId))
    })

    if(likedTripObjects.length === 0){
      return <div id="trip-form"><Segment align="center" inverted><p className="normal-text">You don't like any trips yet!</p></Segment></div>
    } else {
      return likedTripObjects.map(trip => {
        return <Grid.Row><Trip key={trip.id} trip={trip} router={this.props.router}/></Grid.Row>
      })
    }
  }

  render(){
    return(
      <Grid>
        {
          this.props.signedInUser.length === 0 || this.props.tripsList.length === 0 ?
          <div id="trip-form">
            <Segment inverted align="center">
              <p className="normal-text">You must be signed in to see liked trips.</p>
            </Segment>
          </div>
          :
          this.renderLikedTrips()
        }
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signedInUser: state.signedInUser,
    tripsList: state.trips
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTrips: () => dispatch(fetchAllTrips()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedTripsContainer)

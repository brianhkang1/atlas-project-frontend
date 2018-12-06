import React from 'react'
import Trip from '../components/Trip'
import { connect } from 'react-redux'
import { fetchAllTrips } from '../redux/actions/fetch_AllTrips'
import { fetchSignedInUser } from '../redux/actions/fetch_signedInUser'
import { Grid, Segment } from 'semantic-ui-react'
import Infinite from 'react-infinite'

class LikedTripsContainer extends React.PureComponent{
  componentDidMount(){
    this.props.fetchAllTrips()
    let token = localStorage.getItem('token')
    if(token && token !== "undefined"){
      this.props.fetchSignedInUser()
    }
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
      return likedTripObjects.reverse().map(trip => {
        return <Grid.Row key={trip.id} className="trip-row">
                <Trip key={trip.id} trip={trip} router={this.props.router}/>
               </Grid.Row>
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
              <p className="you-must-be-signed-in">You must be signed in to see liked trips.</p>
            </Segment>
          </div>
          :
          <div className="trips-index-row-container">
            <Infinite containerHeight={900} elementHeight={340} >
              {this.renderLikedTrips()}
            </Infinite>
          </div>
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
    fetchSignedInUser: () => dispatch(fetchSignedInUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedTripsContainer)

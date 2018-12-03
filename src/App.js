import React, { Component } from 'react';
import { Route, withRouter }  from 'react-router-dom'
import MainHeader from './components/MainHeader'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import MapContainer from './containers/MapContainer'
import TripsContainer from './containers/TripsContainer'
import LikedTripsContainer from './containers/LikedTripsContainer'
import TripFormContainer from './containers/TripFormContainer'
import TripDetails from './components/TripDetails'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchSignedInUser } from './redux/actions/fetch_signedInUser'

class App extends Component {
  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      this.props.fetchSignedInUser()
    }
  }

  render() {
    return (
      <Grid id="page-grid" columns={2}>
        <Grid.Column className="mainheader-container" width={3}>
          <Route path="/" render={(props) => <MainHeader router={props}/>}/>
        </Grid.Column>
        <Grid.Column width={13}>
          <Route exact path="/" render={() => <Home/>}/>
          <Route exact path="/about" render={() => <About/>}/>
          <Route exact path="/map" render={() => <MapContainer/>}/>
          <Route exact path="/trips" render={(props) => <TripsContainer router={props}/>}/>
          <Route exact path="/liked_trips" render={() => <LikedTripsContainer/>}/>
          <Route exact path="/form" render={(props) => <TripFormContainer router={props}/>}/>
          <Route exact path="/trips/:id" render={(props) => {
          let tripId = parseInt(props.match.params.id)
          return <TripDetails tripId={tripId} router={props}/>}}
          />
        {this.props.signedInUser.length === 0 ?
        <React.Fragment>
          <Route exact path="/login" render={(props) => <Login router={props} />} />
          <Route exact path="/signup" render={(props) => <Signup router={props}/>}/>
        </React.Fragment> : null
        }
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {signedInUser: state.signedInUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignedInUser: () => dispatch(fetchSignedInUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

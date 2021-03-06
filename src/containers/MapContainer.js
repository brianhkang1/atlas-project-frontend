import React from 'react'
import Map from '../components/Map'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchRestCountriesAPI } from '../redux/actions/fetch_restcountriesAPI'
import { fetchAllTrips } from '../redux/actions/fetch_AllTrips'

class MapContainer extends React.PureComponent{

  componentDidMount(){
    this.props.fetchRestCountriesAPI()
    this.props.fetchAllTrips()
  }

  filterAlphaCodes = () => {
    let filteredAlphas = []
    let userCountries = []
    //check if properly signed in and countries are fetched
    if(this.props.signedInUser.length !== 0 && this.props.countryList.length !== 0){
      //get full country names of user's created trips
      this.props.signedInUser[0].created_trips.map(trip => userCountries.push(trip.country_name))
      //for each created country, find the alpha code and push to filteredAlphas array
      userCountries.forEach(country => {
        filteredAlphas.push(this.props.countryList.find(c => c.name.toLowerCase() === country.toLowerCase()).alpha3Code)
      })
      return filteredAlphas
    }
  }

  render(){
    return(
      <React.Fragment>
        {
        this.props.signedInUser.length === 0 ?
        <div id="trip-form">
          <Segment inverted align="center">
            <p className="you-must-be-signed-in">You must be signed in to see the map.</p>
          </Segment>
        </div>
        :
        <Map countryCodes={this.filterAlphaCodes} signedInUser={this.props.signedInUser} tripsList={this.props.tripsList} countryList={this.props.countryList} router={this.props.router}/>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signedInUser: state.signedInUser,
    countryList: state.restcountriesAPI,
    tripsList: state.trips
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTrips: () => dispatch(fetchAllTrips()),
    fetchRestCountriesAPI: () => dispatch(fetchRestCountriesAPI())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

import React from 'react'
import Map from '../components/Map'
import { connect } from 'react-redux'
import { fetchRestCountriesAPI } from '../redux/actions/fetch_restcountriesAPI'
import { fetchAllTrips } from '../redux/actions/fetch_AllTrips'

class MapContainer extends React.Component{

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
      <Map countryCodes={this.filterAlphaCodes} signedInUser={this.props.signedInUser} tripsList={this.props.tripsList} countryList={this.props.countryList}/>
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

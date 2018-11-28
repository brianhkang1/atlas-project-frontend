import React from 'react'
import { connect } from "react-redux"
import { Grid } from 'semantic-ui-react'
import { fetchAllTrips } from '../redux/actions/fetch_AllTrips'
import { fetchRestCountriesAPI } from '../redux/actions/fetch_restcountriesAPI'
import Trip from '../components/Trip'
import Searchbar from '../components/Searchbar.js'

class TripsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchInput: ""
    }
  }

  componentDidMount(){
    this.props.fetchAllTrips()
    this.props.fetchRestCountriesAPI()
  }

  handleInputChange = (event) => {
    this.setState({searchInput: event.target.value})
  }

  filteredTrips = () => {
    let filteredTripList = this.props.tripsList.filter(trip => trip.country_name.includes(this.state.searchInput))
    return filteredTripList.map(trip => {
      return <Trip key={trip.id} trip={trip} />
    })
  }


  render(){
    return(
      <div id="trips-page">
        <Grid id="trips-grid" centered>
          <Grid.Row>
            <Searchbar handleInputChange={this.handleInputChange} />
          </Grid.Row>
          <Grid.Row>
            {this.filteredTrips()}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tripsList: state.trips,
    countryList: state.restcountriesAPI
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTrips: () => dispatch(fetchAllTrips()),
    fetchRestCountriesAPI: () => dispatch(fetchRestCountriesAPI())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer)

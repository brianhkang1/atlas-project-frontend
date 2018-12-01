import React from 'react'
import { connect } from "react-redux"
import { Grid } from 'semantic-ui-react'
import { fetchAllTrips } from '../redux/actions/fetch_AllTrips'
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
  }

  handleInputChange = (event) => {
    this.setState({searchInput: event.target.value})
  }

  filteredTrips = () => {
    let filteredTripList = this.props.tripsList.filter(trip => trip.country_name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
    return filteredTripList.map(trip => {
      return <Trip key={trip.id} trip={trip} router={this.props.router}/>
    })
  }


  render(){
    return(
      <div id="trips-page">
        <Grid id="trips-grid" centered columns={3}>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTrips: () => dispatch(fetchAllTrips()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer)

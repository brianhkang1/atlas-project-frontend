import React from 'react'
import { connect } from "react-redux"
import { Grid } from 'semantic-ui-react'
import { fetchAllTrips } from '../redux/actions/fetch_AllTrips'
import Trip from '../components/Trip'
import Searchbar from '../components/Searchbar.js'
import Infinite from 'react-infinite'

class TripsContainer extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      searchInput: ""
    }
  }

  componentDidMount(){
    this.props.fetchAllTrips()
    this.initialSearch()
  }

  initialSearch = () => {
    if(this.props.router.match.params.input){
      this.setState({searchInput: this.props.router.match.params.input})
    }
  }

  handleInputChange = (event) => {
    this.setState({searchInput: event.target.value})
  }

  filteredTrips = () => {
    let filteredTripList = this.props.tripsList.filter(trip => trip.country_name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
    return filteredTripList.map(trip => {
      return <Grid.Row key={trip.id} className="trip-row">
              <Trip key={trip.id} trip={trip} signedInUser={this.props.signedInUser} router={this.props.router}/>
             </Grid.Row>
    })
  }

  render(){
    return(
      <div id="trips-page">
        <Grid id="trips-grid" columns={3}>
          <Grid.Row centered id="searchbar-row">
            <Searchbar id="searchbar" handleInputChange={this.handleInputChange} searchInput={this.state.searchInput}/>
          </Grid.Row>
          <div className="trips-index-row-container">
            <Infinite  containerHeight={620} elementHeight={310} useWindowAsScrollContainer>
              {this.filteredTrips()}
            </Infinite>
          </div>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tripsList: state.trips,
    signedInUser: state.signedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTrips: () => dispatch(fetchAllTrips()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer)

import React from 'react'
import TripForm from '../components/TripForm'
import { connect } from 'react-redux'
import { fetchRestCountriesAPI } from '../redux/actions/fetch_restcountriesAPI'

class TripFormContainer extends React.Component{

  componentDidMount(){
    this.props.fetchRestCountriesAPI()
  }

  render(){
    return(
      <TripForm signedInUser={this.props.signedInUser} countryList={this.props.countryList} router={this.props.router}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signedInUser: state.signedInUser,
    countryList: state.restcountriesAPI
  }
}

const mapDispatchToProps = (dispatch) => {
  return {fetchRestCountriesAPI: () => dispatch(fetchRestCountriesAPI())}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripFormContainer)

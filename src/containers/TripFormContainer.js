import React from 'react'
import TripForm from '../components/TripForm'
import { connect } from 'react-redux'
import { fetchRestCountriesAPI } from '../redux/actions/fetch_restcountriesAPI'
import { fetchSignedInUser } from '../redux/actions/fetch_signedInUser'

class TripFormContainer extends React.PureComponent{

  componentDidMount(){
    //fetch country names to use in datalist 
    this.props.fetchRestCountriesAPI()
  }

  render(){
    return(
      <TripForm signedInUser={this.props.signedInUser} fetchSignedInUser={this.props.fetchSignedInUser} countryList={this.props.countryList} router={this.props.router}/>
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
  return {
    fetchRestCountriesAPI: () => dispatch(fetchRestCountriesAPI()),
    fetchSignedInUser: () => dispatch(fetchSignedInUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripFormContainer)

import React from 'react'
import TripForm from '../components/TripForm'
import { connect } from 'react-redux'

class TripFormContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      countryList: []
    }
  }
  componentDidMount(){
    let arr = []
    fetch(`https://restcountries.eu/rest/v2/`)
      .then(res => res.json())
      .then(json => {
        json.map(country => arr.push({name: country.name, alpha3Code: country.alpha3Code, capital: country.capital}))
        this.setState({countryList: arr})
      })
  }


  render(){
    return(
      <TripForm signedInUser={this.props.signedInUser} countryList={this.state.countryList}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {signedInUser: state.signedInUser}
}

export default connect(mapStateToProps)(TripFormContainer)

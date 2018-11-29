import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Accordion } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchTrip } from '../redux/actions/fetch_Trip'

const BASE_URL = "http://localhost:3000"

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  tabIndex: 0,
  arrows: true
}

class TripDetails extends React.Component{
  componentDidMount(){
    this.props.fetchTrip(this.props.tripId)
  }

  renderPhotos = () => {
    return this.props.trip.photos.map(photo => {
      return <div key={photo.id}>
        <img src={BASE_URL + photo.image_url.url} className="slider-pics"/>
      </div>
    })
  }

  renderTitle = () => {
    if(this.props.trip.country_name.toLowerCase() === "korea (republic of)"){
      return "SOUTH korea"
    } else if(this.props.trip.country_name.toLowerCase() === "united kingdom of great britain and northern ireland"){
      return "GREAT BRITAIN"
    } else {return this.props.trip.country_name.toUpperCase()}
  }

  renderItinerary = () => {
    let panels = []
    this.props.trip.itinerary_days.map((day, index) => {
      panels[index] = {
        key: `panel-${day.id}`,
        title: `DAY ${day.day}: ${day.location.toUpperCase()}`,
        content: day.description
      }
    })
    return panels
  }

  render(){
    return(
      <React.Fragment>
        {this.props.trip.length === 0 ? null :
          <div id="trip-show-page">
            <h1 className="show-page-title">{this.renderTitle()}</h1>

            <Slider {...sliderSettings}>
              {this.renderPhotos()}
            </Slider>

            <div className="trip-show-summary">
              <h1>OVERVIEW</h1>
              <p>{this.props.trip.summary}</p>
            </div>

            <div className="trip-show-itinerary">
              <h1>ITINERARY</h1>
              <Accordion panels={this.renderItinerary()} exclusive={false} fluid />
            </div>

          </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {trip: state.trip}
}

const mapDispatchToProps = (dispatch) => {
  return {fetchTrip: (tripId) => dispatch(fetchTrip(tripId))}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails)

import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Accordion, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchTrip } from '../redux/actions/fetch_Trip'

const BASE_URL = `http://localhost:3000`

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
  constructor(props){
    super(props)
    this.state = {
      userLikesTrip: false
    }
  }

  componentDidMount(){
    this.props.fetchTrip(this.props.tripId)
  }

  componentDidUpdate(prevProps){
    //this will trigger when user clicks on the like/heart feature
    if((this.props.trip.length !== 0 && this.props.signedInUser.length !== 0) && (this.props.trip !== prevProps.trip || this.props.signedInUser !== prevProps.signedInUser)){
      if(this.props.trip.trip_likers.find(likers => likers.id === this.props.signedInUser[0].id)){
        this.setState({userLikesTrip: true})
      }
    }
  }

  renderPhotos = () => {
    return this.props.trip.photos.map(photo => {
      return <div key={photo.id}>
        <Image src={BASE_URL + photo.image_url.url} className="slider-pics"/>
      </div>
    })
  }

  renderTitle = () => {
    if(this.props.trip.country_name.toLowerCase() === "korea (republic of)"){
      return "SOUTH KOREA"
    } else if(this.props.trip.country_name.toLowerCase() === "united kingdom of great britain and northern ireland"){
      return "GREAT BRITAIN"
    } else {return this.props.trip.country_name.toUpperCase()}
  }

  renderItinerary = () => {
    let panels = []
    this.props.trip.itinerary_days.map((day, index) => {
      return panels[index] = {
        key: `panel-${day.id}`,
        title: `DAY ${day.day}: ${day.location.toUpperCase()}`,
        content: day.description
      }
    })
    return panels
  }

  handleLikeClick = (event) => {
    //when user clicks on heart, post new trip_like instance to backend
    let body = {
      trip_liker_id: this.props.signedInUser[0].id,
      liked_trip_id: this.props.tripId
    }

    fetch(`${BASE_URL}/api/v1/trip_likes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(body)
    }).then(res => {
      this.setState({userLikesTrip: true})
      this.props.fetchTrip(this.props.tripId)
    })
  }

  handleUnlikeClick = (event) => {
    //when user unlikes trip, first get the id of trip_like, then send delete request to backend  
    fetch(`${BASE_URL}/api/v1/trip_likes`)
      .then(res => res.json())
      .then(json => {
        let tripLikeId = json.find(like => like.trip_liker_id === this.props.signedInUser[0].id && like.liked_trip_id === this.props.tripId).id
        this.deleteTripLikeBackend(tripLikeId)
          .then(res => {
            this.setState({userLikesTrip: false})
            this.props.fetchTrip(this.props.tripId)
          })
      })
  }

  deleteTripLikeBackend = (tripLikeId) => {
    return fetch(`${BASE_URL}/api/v1/trip_likes/${tripLikeId}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  render(){
    return(
      <React.Fragment>
        {this.props.trip.length === 0 ? null :
          <div id="trip-show-page">
            <div id="trip-show-header">
            <div className="trip-show-header-container">
              <div id="trip-show-title">{this.renderTitle()}</div>
              <div id="trip-show-username">posted by: {this.props.trip.creator.username}</div>
              <div id="trip-show-heart-text">
                {this.props.signedInUser.length === 0 ? null :
                  this.state.userLikesTrip ?
                    <Icon id="heart" name="heart" size="large" onClick={this.handleUnlikeClick} color="red"/>
                    :
                    <Icon id="heart" name="heart" size="large" onClick={this.handleLikeClick}/>
                } liked by {this.props.trip.trip_likers.length} explorers
              </div>
              </div>
            </div>

            <Slider {...sliderSettings}>
              {this.renderPhotos()}
            </Slider>

            <div className="trip-show-overview-container">
              <h1 className="black-box">OVERVIEW</h1>
              <p className="trip-show-summary-content">{this.props.trip.summary}</p>
            </div>

            <div className="trip-show-itinerary-container">
              <h1 className="black-box">ITINERARY</h1>
              <Accordion className="trip-show-itinerary-content" panels={this.renderItinerary()} exclusive={false} fluid />
            </div>

          </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trip: state.trip,
    signedInUser: state.signedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrip: (tripId) => dispatch(fetchTrip(tripId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails)

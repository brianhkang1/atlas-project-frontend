<div className="overlay" onClick={(event) => this.handleImageClick(event, this.props.router)}>
  <div>{this.props.trip.country_name.toUpperCase()}</div>
  <div>posted by: {this.props.trip.creator.username}</div>
</div>


import React from 'react'
import { Image, Container } from 'semantic-ui-react'

const BASE_URL = "http://localhost:3000"


class LikedTrip extends React.PureComponent{

  handleImageClick = (event, routerProps) => {
    routerProps.history.push(`/trips/${this.props.trip.id}`)
  }

  renderPhotos = () => {
    if(this.props.trip.photos.length === 0){
      return "https://images.unsplash.com/photo-1484544808355-8ec84e534d75?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc1407c2a550b0ebf3def8b81fa7b4a2&auto=format&fit=crop&w=1532&q=80"
    } else {return BASE_URL+this.props.trip.photos[0].image_url.url}
  }

  render(){
    return(
        <Container className="trip-images-container">
          <Image className="trip-images" src={this.renderPhotos()} onClick={(event) => this.handleImageClick(event, this.props.router)}/>
          <div className="trip-image-text">{this.props.trip.country_name.toUpperCase()} | {this.props.trip.creator.username}</div>
        </Container>
    )
  }
}

export default LikedTrip

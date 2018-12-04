import React from 'react'
import { Grid, Image, Container } from 'semantic-ui-react'

const BASE_URL = "http://localhost:3000"


class Trip extends React.Component{
  constructor(props){
    super(props)
    this.state={
      liked: false
    }
  }

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
      <Grid.Column className="trip-images-columns">
        <Container className="trip-images">
          <Image src={this.renderPhotos()}/>
          <div className="overlay" onClick={(event) => this.handleImageClick(event, this.props.router)}>
            <div>{this.props.trip.country_name.toUpperCase()}</div>
            <div>posted by: {this.props.trip.creator.username}</div>
          </div>
        </Container>
      </Grid.Column>
    )
  }
}

export default Trip

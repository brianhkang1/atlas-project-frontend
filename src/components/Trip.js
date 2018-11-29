import React from 'react'
import { Grid, Image, Container } from 'semantic-ui-react'

const BASE_URL = "http://localhost:3000"


class Trip extends React.Component{

  handleImageClick = (event, routerProps) => {
    routerProps.history.push(`/trips/${this.props.trip.id}`)
  }

  render(){
    return(
      <Grid.Column className="trip-images-columns">
        <Container className="trip-images">
          <Image src={BASE_URL+this.props.trip.photos[0].image_url.url} />
          <div className="overlay" onClick={(event) => this.handleImageClick(event, this.props.router)}>{this.props.trip.country_name.toUpperCase()}</div>
        </Container>
      </Grid.Column>
    )
  }
}

export default Trip

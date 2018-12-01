import React from 'react'
import {Segment, Form, Button, Icon, Input} from 'semantic-ui-react'
import ImageUploader from 'react-images-upload'

const TRIPS_URL = `http://localhost:3000/api/v1/trips`

class TripForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      country: "",
      summary: "",
      itinerary: [""],
      locations: [],
      pictures: []
    }
  }

  onDrop = (picture) => {
    this.setState({pictures: this.state.pictures.concat(picture)})
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddItinerary = () => {
    let arr = [...this.state.itinerary, ""]
    this.setState({itinerary: arr})
  }

  handleDeleteItinerary = () => {
    let arr = [...this.state.itinerary]
    arr.splice(arr.length-1, 1)
    this.setState({itinerary: arr})
  }

  handleItineraryChange = (index, newValue) => {
    const updatedArray = [...this.state.itinerary];
    updatedArray[index] = newValue
    this.setState({itinerary: updatedArray});
  }

  handleLocationChange = (index, newValue) => {
    const updatedArray = [...this.state.locations];
    updatedArray[index] = newValue
    this.setState({locations: updatedArray});
  }

  handleSubmit = (event, routerProps) => {
    event.preventDefault()
    if(this.props.countryList.find(country => country.name.toLowerCase() === this.state.country.toLowerCase())){
      this.postToTrips(routerProps)
    } else {alert("Please choose a valid country")}
  }

  postToTrips = (routerProps) => {
    let loc = [...this.state.locations]
    for (let i = 0; i < loc.length - 1; i++){
      loc[i] = loc[i] + "&&&"
    }

    let iti = [...this.state.itinerary]
    for (let i = 0; i < iti.length - 1; i++){
      iti[i] = iti[i] + "&&&"
    }

    let formData = new FormData()
    formData.append("creator_id", this.props.signedInUser[0].id)
    formData.append("country_name", this.state.country)
    formData.append("summary", this.state.summary)
    this.state.pictures.forEach( (photo, index) => {
      formData.append(`photo-${index+1}`, photo)
    })
    formData.append("photoCount", this.state.pictures.length)
    formData.append("itinerary", iti)
    formData.append("locations", loc)

    fetch(TRIPS_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    }).then(res => res.json()).then(json => {
      // this.props.fetchAllRecipes()
      if (json.error){
        alert("Form could not be posted. Please make sure all fields are filled out.")
      } else { routerProps.history.push(`/trips/${json.id}`) }
    })
  }

  render(){
    return(
      <div id="tripform-page">
      <div id="trip-form">
      {this.props.signedInUser.length === 0 ?
        <Segment>
          <p className="normal-text">You must be signed in to post a trip.</p>
        </Segment>
        :
        <Form onSubmit={(event) => this.handleSubmit(event, this.props.router)}>
          <Segment>
            <Form.Field>
              <label>Choose a country</label>
              <input required list="countries" name="country" onChange={this.handleChange}/>
              <datalist id="countries">
                {this.props.countryList.map(country => <option key={country.name} value={country.name} />)}
              </datalist>
            </Form.Field>
            <Form.TextArea required label="Summary of your trip" name="summary" onChange={this.handleChange} />
            <Form.Field>
              <span>
                <label><Icon circular id="add-button" onClick={this.handleAddItinerary} name="plus"/>Add another itinerary day </label>
                <label><Icon circular id="delete-button" onClick={this.handleDeleteItinerary} name="minus"/>Delete last itinerary day</label>
              </span>
                {this.state.itinerary.map((day, index) =>
                  <Segment key={index}>
                    <Input required label="Location: " style={{width:200}} onChange={(event) => this.handleLocationChange(index, event.target.value)}/>
                    <textarea required rows="2" placeholder={"Day "+ (index+1) + " itinerary"}
                    onChange={(event) => this.handleItineraryChange(index, event.target.value)} />
                  </Segment>
                )}
            </Form.Field>
            <Segment>
              <ImageUploader required withIcon={true} withLabel={false} withPreview={true} buttonText='Upload image(s) of your trip' onChange={this.onDrop} imgExtension={['.jpg', '.png']}/>
            </Segment>
            <Button fluid content="share" color="blue" onClick={(event) => this.handleSubmit(event, this.props.router)} />
          </Segment>
        </Form>
      }
      </div>
      </div>
    )
  }
}

export default TripForm

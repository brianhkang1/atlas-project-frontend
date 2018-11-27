import React from 'react'
import {Segment, Form, Button, Icon} from 'semantic-ui-react'

class TripForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      country: "",
      time: "",
      cost: "",
      summary: "",
      itinerary: [""],
      image: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleCountryPick = (event) => {
  //   if(this.props.countryList.find(country => country.name === event.target.value)){
  //     this.setState({country: country.alpha3Code})
  //   } else {alert("Please choose a valid country")}
  // }

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
    updatedArray[index] = newValue;
    this.setState({itinerary: updatedArray});
  }

  // handleSubmit = (event, routerProps) => {
  //   event.preventDefault()
  //
  //   let formData = new FormData()
  //   formData.append("name", this.state.name)
  //   formData.append("time", this.state.time)
  //   formData.append("cost", this.state.cost)
  //   formData.append("summary", this.state.summary)
  //   formData.append("ingredients", this.state.ingredients.join("&&"))
  //   formData.append("instructions", this.state.instructions.join("&&"))
  //   formData.append("user_id", this.props.signedInUser.id)
  //   formData.append("image", this.state.image, this.state.image.name)
  //
  //   fetch(`http://localhost:3000/api/v1/trips`, {
  //     method: "POST",
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.getItem("token")}`
  //     },
  //     body: formData
  //   }).then(res => res.json()).then(json => {
  //     // this.props.fetchAllRecipes()
  //     routerProps.history.push(`/trips/${json.id}`)})
  //   }

  // handleImageUpload = (event) => {
  //   this.setState({[event.target.name]: event.target.files[0]})
  // }

  render(){
    return(
      <div id="trip-form">
      {this.props.signedInUser ?
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
                    <textarea required rows="2" placeholder={"Day "+ (index+1) + " itinerary"}
                    onChange={e => this.handleItineraryChange(index, e.target.value)} />
                  </Segment>
                )}
            </Form.Field>
            <Form.Input required fluid label="Upload image(s) of your trip" id="upload-image" type="file" name="image" accept="image/*" onChange={this.handleImageUpload}/>
            <Button color="blue" fluid >Share</Button>
          </Segment>
        </Form>
      : <Segment><p className="normal-text">You must be signed in to post a trip.</p></Segment>
      }
      </div>
    )
  }
}

export default TripForm

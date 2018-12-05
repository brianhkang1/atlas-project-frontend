import React from 'react'
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import { Icon } from 'semantic-ui-react'
import whichCountry from 'pp-which-country'

const TOKEN = 'pk.eyJ1IjoiYnJpYW5oa2FuZzEiLCJhIjoiY2pvcWdhcDBoMDBiOTNwbzhwYmZoZXdhcCJ9.OJ80JPnBiloxsbYIBuP5-Q';

class Map extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      viewport: {
        width: "100%",
        height: "100vh",
        latitude: 44.5739,
        longitude: 7.7952,
        zoom: 1.19
      },
      popupInfo: null,
      addNewMarker: null,
      pinned_locations: []
    }
  }

  componentDidMount(){
    const map = this.reactMap.getMap()
    map.on('load', () => this.addLayer(map, this.props.countryCodes()))
  }

  addLayer = (map, countryCodes) => {
    map.addLayer({
      'id': 'countries',
      'source': {
        'type': 'vector',
        'url': 'mapbox://brianhkang1.cjorlrqa'
      },
      'source-layer': 'ne_10m_admin_0_countries-40v53a',
      'type': 'fill',
      'paint': {
        'fill-color': 'rgb(205,153,61)', //color of highlighted countries
        'fill-outline-color': '#F2F2F2' //white outline between countries
      }
    })

    map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(countryCodes))
    if(this.props.signedInUser.length !== 0){
      this.setState({pinned_locations: this.props.signedInUser[0].pinned_locations})
    }
  }

  handleMarkerClick = (event, longitude, latitude) => {
    // alert(whichCountry([longitude, latitude]))
    this.setState({
      popupInfo: {
        longitude: longitude,
        latitude: latitude,
        alpha3Country: whichCountry([longitude, latitude])
      }
    })
  }

  routeToSearchTrips = (event, routerProps, fullCountryName) => {
    routerProps.history.push(`/search_trips/${fullCountryName}`)
  }

  renderCountryTrips = () => {
    let fullCountryName = this.props.countryList.find(country => country.alpha3Code === this.state.popupInfo.alpha3Country).name
    let filteredTrips = this.props.tripsList.filter(trip => trip.country_name === fullCountryName)
    if(filteredTrips.length === 0){
      return <div>No trips posted for {fullCountryName}. <span className="be-the-first" onClick={(event) => this.routeToForm(event, this.props.router)}>You can be the first!</span></div>
    } else {
      return <div>See trips for <span className="see-trips-for" onClick={(event) => this.routeToSearchTrips(event, this.props.router, fullCountryName)}>{fullCountryName}</span></div>
    }
  }

  routeToForm = (event, routerProps) => {
    routerProps.history.push("/form")
  }
  closePopup = () => {
    this.setState({popupInfo: null})
  }

  renderPopup = () => {
    return this.state.popupInfo && (
    <Popup tipSize={10}
      anchor="bottom"
      longitude={this.state.popupInfo.longitude}
      latitude={this.state.popupInfo.latitude}
      offsetTop={-20}
      closeButton={false}
    >
    <div id="popup-box" onClick={this.closePopup}>
      <div>{this.renderCountryTrips()}</div>
      <br/>
      <div id="delete-pin">
        <span className="delete-pin-text" onClick={this.handleDeletePin}>
          Delete this pin
        </span>
      </div>
    </div>
    </Popup>
    )
  }

  handleDeletePin = (event) => {
    event.preventDefault()
    let longitude = this.state.popupInfo.longitude.toFixed(4)
    let latitude = this.state.popupInfo.latitude.toFixed(4)

    let pinIdToDelete = this.state.pinned_locations.find(loc => parseFloat(loc.longitude).toFixed(4) === longitude && parseFloat(loc.latitude).toFixed(4) === latitude).id

    this.deletePinBackend(pinIdToDelete)
    this.deletePinFrontEnd(pinIdToDelete)

  }

  deletePinFrontEnd = (pinIdToDelete) => {
    let newPinnedLocations = [...this.state.pinned_locations]
    let pinIndexToDelete = newPinnedLocations.findIndex(loc => loc.id === pinIdToDelete)

    newPinnedLocations.splice(pinIndexToDelete, 1)
    this.setState({pinned_locations: newPinnedLocations})
  }


  deletePinBackend = (pinIdToDelete) => {
    fetch(`http://localhost:3000/api/v1/pinned_locations/${pinIdToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  renderMarkers = () => {
    return this.state.pinned_locations.length !== 0 && this.state.pinned_locations.map(loc => {
      return <Marker ref={`marker-${loc.id}`} key={loc.id} longitude={parseFloat(loc.longitude)} latitude={parseFloat(loc.latitude)} offsetLeft={-11} offsetTop={-20}><Icon size="large" name="map pin" color="red" onClick={(event) => this.handleMarkerClick(event, parseFloat(loc.longitude), parseFloat(loc.latitude))}/></Marker>
    })
  }

  handleMapClick = (event) => {
    this.setState({
      addNewMarker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    })
    this.postPinnedLocation()
  }

  postPinnedLocation = () => {
    let body = {
      user_id: this.props.signedInUser[0].id,
      longitude: this.state.addNewMarker.longitude,
      latitude: this.state.addNewMarker.latitude,
      country: whichCountry([this.state.addNewMarker.longitude, this.state.addNewMarker.latitude])
    }

    if(body.country === null){
      alert("You can't pin the ocean")
    } else {
      fetch(`http://localhost:3000/api/v1/pinned_locations`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
      }).then(res => res.json()).then(json => {
        this.setState({
          pinned_locations: [...this.state.pinned_locations, json]
        })
      })
    }
  }

  getCursor = ({isHovering, isDragging}) => {
    return isHovering ? 'pointer' : 'default';
  }

  render() {
    return (
        <ReactMapGL
          ref={(reactMap) => { this.reactMap = reactMap; }}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={(viewport) => this.setState({viewport})}
          minZoom={1.19}
          onClick={this.handleMapClick}
          getCursor={this.getCursor}
        >
        {this.props.signedInUser.length === 0 ? null : this.renderMarkers()}
        {this.renderPopup()}
          <div>
            <div id="mapCoordinateDisplay">
              <div>{`Latitude: ${this.state.viewport.latitude.toFixed(4)} // Longitude: ${this.state.viewport.longitude.toFixed(4)} // Zoom: ${this.state.viewport.zoom.toFixed(2)}`}</div>
            </div>
            <br/>
            <div id="mapCoordinateDisplay">
              <div>Countries you've posted in are highlighted</div>
              <div>Left click to pin countries you'd like to visit</div>
            </div>
          </div>
          <div style={{position: 'absolute', right: 0, top: 0, padding: 25}}>
           <NavigationControl onViewportChange={(viewport) => this.setState({viewport})} showCompass={false} />
         </div>
      </ReactMapGL>
    );
  }
}

export default Map

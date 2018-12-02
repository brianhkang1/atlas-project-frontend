import React from 'react'
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import { Icon } from 'semantic-ui-react'
import whichCountry from 'pp-which-country'


const TOKEN = 'pk.eyJ1IjoiYnJpYW5oa2FuZzEiLCJhIjoiY2pvcWdhcDBoMDBiOTNwbzhwYmZoZXdhcCJ9.OJ80JPnBiloxsbYIBuP5-Q';

class Map extends React.Component {
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
      addNewMarker: null
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
        'fill-color': 'rgb(205,153,61)', //this is the color you want your tileset to have (I used a nice purple color)
        'fill-outline-color': '#F2F2F2' //this helps us distinguish individual countries a bit better by giving them an outline
      }
    })

    map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(countryCodes));
  }

  handleMarkerClick = (event, longitude, latitude) => {
    alert(whichCountry([longitude, latitude]))
  }

  renderMarkers = () => {
    return this.props.signedInUser[0].pinned_locations.map(loc => {
      return <Marker key={loc.id} longitude={parseFloat(loc.longitude)} latitude={parseFloat(loc.latitude)} offsetLeft={-20} offsetTop={-10}><Icon size="large" name="map pin" color="red" onClick={(event) => this.handleMarkerClick(event, parseFloat(loc.longitude), parseFloat(loc.latitude))}/></Marker>
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
      longitude: this.state.addNewMarker.longitude.toFixed(4),
      latitude: this.state.addNewMarker.latitude.toFixed(4),
      country: whichCountry([this.state.addNewMarker.longitude, this.state.addNewMarker.latitude])
    }

    fetch(`http://localhost:3000/api/v1/pinned_locations`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(body)
    }).then(res => res.json()).then(json => console.log(json))
  }

  addMarker = (event) => {
    return this.state.addNewMarker && (
      <Marker longitude={this.state.addNewMarker.longitude} latitude={this.state.addNewMarker.latitude} offsetLeft={-10} offsetTop={-20}>
        <Icon size="large" name="map pin" color="red" onClick={(event) => this.handleMarkerClick(event, this.state.addNewMarker.longitude, this.state.addNewMarker.latitude)}/>
      </Marker>
    )
  }

  getCursor = ({isHovering, isDragging}) => {
  return isHovering ? 'pointer' : 'default';
};

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
        {this.addMarker()}
        {this.props.signedInUser.length === 0 ? null : this.renderMarkers()}

          <div id="mapCoordinateDisplay">
            <div>{`Latitude: ${this.state.viewport.latitude.toFixed(4)} // Longitude: ${this.state.viewport.longitude.toFixed(4)} // Zoom: ${this.state.viewport.zoom.toFixed(2)}`}</div>
          </div>
          <div style={{position: 'absolute', right: 0, top: 0, padding: 25}}>
           <NavigationControl onViewportChange={(viewport) => this.setState({viewport})} showCompass={false} />
         </div>
      </ReactMapGL>
    );
  }
}

export default Map

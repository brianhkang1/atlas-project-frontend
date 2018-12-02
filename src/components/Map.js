import React from 'react'
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import { Icon } from 'semantic-ui-react'

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

  handleMarkerClick = (event) => {
    debugger
    alert(JSON.stringify(event.lngLat))
  }

  renderMarkers = () => {
    return this.props.signedInUser[0].pinned_locations.map(loc => {
      return <Marker longitude={parseFloat(loc.longitude)} latitude={parseFloat(loc.latitude)}><Icon size="large" name="map pin" color="red" onClick={this.handleMarkerClick}/></Marker>
    })
  }

  handleMapClick = (event) => {
    debugger
    this.setState({
      addNewMarker: {
        longitude: event.lngLat[0]-2,
        latitude: event.lngLat[1]+2
      }
    })
  }

  addMarker = (event) => {
    return this.state.addNewMarker && (
      <Marker longitude={this.state.addNewMarker.longitude} latitude={this.state.addNewMarker.latitude}>
        <Icon size="large" name="map pin" color="red" onClick={this.handleMarkerClick}/>
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

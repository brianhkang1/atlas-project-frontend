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
      }
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
      >
      <Marker latitude={37.78} longitude={-122.41}>
        <Icon size="large" name="map pin" color="red" onClick={this.handleMarkerClick}/>
      </Marker>
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

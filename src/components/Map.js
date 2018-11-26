import React from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoiYnJpYW5oa2FuZzEiLCJhIjoiY2pvcWdhcDBoMDBiOTNwbzhwYmZoZXdhcCJ9.OJ80JPnBiloxsbYIBuP5-Q';

class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      viewport: {
        width: 1175,
        height: 770,
        latitude: 44.5739,
        longitude: 7.7952,
        zoom: 1.19
      }
    }
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(viewport) => this.setState({viewport})}
        minZoom={1.19}
      >
        <div id="mapCoordinateDisplay">
          <div>{`Latitude: ${this.state.viewport.latitude.toFixed(4)} // Longitude: ${this.state.viewport.longitude.toFixed(4)} // Zoom: ${this.state.viewport.zoom.toFixed(2)}`}</div>
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, padding: 10}}>
         <NavigationControl onViewportChange={(viewport) => this.setState({viewport})} showCompass={false} />
       </div>
      </ReactMapGL>
    );
  }
}

export default Map

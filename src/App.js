import React, { Component } from 'react';
import { Route }  from 'react-router-dom'
import MainHeader from './components/MainHeader'
import About from './components/About'
import MapContainer from './containers/MapContainer'
import { Grid } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Grid id="page-grid" columns={2}>
        <Grid.Column className="mainheader-container" width={3}>
          <Route path="/" render={() => <MainHeader />}/>
        </Grid.Column>
        <Grid.Column width={13}>
          <Route exact path="/about" render={() => <About />}/>
          <Route exact path="/map" render={() => <MapContainer />}/>
        </Grid.Column>
      </Grid>
      // <React.Fragment>
      //   <Route path="/" render={() => <MainHeader />}/>
      //   <Route exact path="/about" render={() => <About />}/>
      //   <Route exact path="/map" render={() => <MapContainer />}/>
      // </React.Fragment>
    );
  }
}

export default App;

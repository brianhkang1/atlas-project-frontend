import React, { Component } from 'react';
import { Route }  from 'react-router-dom'
import MainHeader from './components/MainHeader'
import About from './components/About'
import { Grid } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Grid >
        <Grid.Column width={4}>
          <Route path="/" render={() => <MainHeader />}/>
        </Grid.Column>
        <Grid.Column floated="left" width={11} className="non-header-content">
          <Route exact path="/about" render={() => <About />}/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;

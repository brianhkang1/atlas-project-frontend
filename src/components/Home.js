import React from 'react'
import { Icon } from 'semantic-ui-react'

class Home extends React.PureComponent{
  constructor(props){
    super(props)
    this.state={
      pageMoveToTop: null
    }
  }

  handleClick = (event, routerProps) => {
    this.setState({pageMoveToTop: "pt-page-moveToTop"})
    setTimeout(() => routerProps.history.push('/about'), 1000); //wait one second before transitioning to about page
  }


  render(){
    return(
      <div id="home-page">
        <h1 id="home-title" className={this.state.pageMoveToTop}>ATLAS</h1>
        <div><Icon size="huge" id="home-icon" name="chevron down" onClick={(event) => this.handleClick(event, this.props.router)}/></div>
      </div>
    )
  }
}

export default Home

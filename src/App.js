import React from 'react';
// import logo from './logo.svg';
import backButtonIcon from './back-button.svg'
import './App.css';
import '../node_modules/webview-tile-header/webview-tile-header.js'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      platform: 'android'
    }
  }

  componentDidMount() {
    const backButton = document.getElementById('header');
    backButton.addEventListener('back-button-click', handleBackButtonClick)
  }

  render() {
    return (
      <div className="App">
        <moduware-header 
          id="header"
          title="Speaker Tile" 
          backButtonIcon={ this.state.platform === "ios" ? backButtonIcon : ""}
          ref="header">
        </moduware-header>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Speaker tile to be inserted here.
          </p>
          
        </header>
      </div>
    );
  }
}

/*global Nexpaq */
function handleBackButtonClick() {
  console.log('header back button clicked!')
  if(typeof Nexpaq !== "undefined") {
    Nexpaq.API.Exit();
  }
}

export default App;

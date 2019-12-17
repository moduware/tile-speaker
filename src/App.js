import React from 'react';
// import logo from './logo.svg';
import backButtonIcon from './back-button.svg'
import './App.css';
import '../node_modules/webview-tile-header/webview-tile-header.js'
import { IntlProvider } from 'react-intl'
import {FormattedMessage} from 'react-intl'

window.lang = 'en';

/*global Moduware */

if (window.ModuwareAPIIsReady) {
  console.log('moduware detected')
  ApiReadyActions();
} else {
  console.log('no moduware detected');
  document.addEventListener('WebViewApiReady', () => ApiReadyActions(), { once: true });
}

function ApiReadyActions() {
  console.log('API ready actions fired!');
  if (Moduware) {
    console.log(Moduware.Arguments.language);
    window.lang = Moduware.Arguments.language;
    console.log(window.lang)
    // this.setState({ locale: lang })
  }
}

class App extends React.Component {

  handleModuwareIsReady() {
    console.log('moduware api is now ready to use', window.lang);
    console.log('argument', Moduware.Arguments);
    this.setState({ locale: Moduware.Arguments.language });
  }

  constructor() {
    super()
    this.state = {
      platform: 'android',
      locale: 'zh'
    }
    this.handleModuwareIsReady = this.handleModuwareIsReady.bind(this);
  }

  componentDidMount() {
    const backButton = document.getElementById('header');
    backButton.addEventListener('back-button-click', handleBackButtonClick)

    if (window.ModuwareAPIIsReady) {
      console.log('we are ready');
      this.handleModuwareIsReady();
    } else {
      console.log('we are not yet ready...')
      document.addEventListener('WebViewApiReady', () => this.handleModuwareIsReady(), { once: true });
    }
    
    console.log('state', this.state.locale);
    console.log('window.lang', window.lang);
    this.setState({ locale: window.lang })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('did updates', prevProps);
    // this.setState({ locale: this.props.locale });
    console.log('state.locale', this.state.locale);
    console.log('this.props.locale', this.props.locale)
  }

  


  render() {
    let language = this.state.locale;

    const en_messages = {
      "text": "kljlkjklj;kl;kj;lkj",
      "header.title": 'hello world'
    }

    const zh_messages = {
      "text": "lajsdfljas;ldfkj (Chinese)",
      "header.title": 'hello world (Chinese)'
    }

    const messages = {
      "en": en_messages,
      "zh": zh_messages
    }

    return (
      <IntlProvider locale={language} messages={messages[language]}>
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
              <FormattedMessage 
                id="header.title"
              />
              <br />
              Speaker tile to be inserted here.
            </p>
            
          </header>
        </div>
      </IntlProvider>
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

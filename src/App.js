import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './MainPage.css';
// import Notice from './notice';
import MainPage from './MainPage.js'



import '@formatjs/intl-pluralrules/polyfill-locales';



if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for en
}

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/zh'); // Add locale data for zh
}


class App extends React.Component{

  render(){
    return (
        <div>
          <MainPage />
        </div>
    );
  }
}


export default App;

import React from 'react';
import './MainPage.css';


import {IntlProvider} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import messages_zh from "./translations/zh.json";
import messages_en from "./translations/en.json";

import '../node_modules/webview-tile-header/webview-tile-header';

/*global Moduware*/

const messages = {
    'zh': messages_zh,
    'en': messages_en
};


class MainPage extends React.Component {

    handleModuwareIsReady() {
        console.log('moduware api is now ready to use', window.lang);
        console.log('argument', Moduware.Arguments);
        this.setState({ locale: Moduware.Arguments.language });
    }

    constructor(){
        super()
        this.state = {
            isChecked: true,
            locale: 'zh'
        }
        this.speakerButtonClickHandler = this.speakerButtonClickHandler.bind(this)
        this.handleChecked = this.handleChecked.bind(this);
        this.handleModuwareIsReady = this.handleModuwareIsReady.bind(this);
    }


    speakerButtonClickHandler() {
        
        this.setState(changeState => {
            document.getElementById('speaker-button').classList.toggle('active');
        if (document.getElementById('speaker-button').classList.contains('active')) {
            console.log('connect')
            if (typeof Moduware != 'undefined'){
                Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'Connect', []);
            }
        } else {
            console.log('disconnect')
            if (typeof Moduware != 'undefined'){
                Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'Disconnect', []);
            }
        }
        }
        )
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
        
    }

    handleChecked () {
        this.setState({isChecked: !this.state.isChecked});
        if (this.state.isChecked) {
            console.log('checked')
            if (typeof Moduware != 'undefined'){
            console.log('API ready')
            Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetDefaultStateAsOn', []);
            }
          } else {
            console.log('unchecks')
            if (typeof Moduware != 'undefined'){
            console.log('API ready')
            Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetDefaultStateAsOff', []);
            }
          }
      }


    render() {
        let language = this.state.locale;
        return (
            <IntlProvider locale={language} messages={messages[language]}>
                <div className="App">
                    <moduware-header
                        id="header"
                        title="Speaker Tile"
                        ref="header">
                    </moduware-header>
                </div>
                <div id="wrapper" className="wrapper">
                    <div className="page page--main" id="pageMain">
                        <FormattedMessage 
                            id='test'
                            defaultMessage='Dashboard'
                        />
                        <div id="speaker-control" className="speaker-control" >
                            <button onClick={this.speakerButtonClickHandler} className="speaker-button" id="speaker-button"><i className="material-icons">power_settings_new</i></button>
                        </div>
                        <span className="explanation explanation--connect" id="explanationConnect">
                        <FormattedMessage 
                            id='setting'
                            defaultMessage='To connect speaker module go to settings -> bluetooth, then pair Moduware speaker'
                        />
                        </span>
                    </div>
                    <div id="default-state-control" className="default-state-control">
                        <span><FormattedMessage 
                            id='default.state'
                            defaultMessage='Turn on when plugged in'
                        /></span>
                        <label id="default-state-control-label" className="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="default-state-switch">
                            <input type="checkbox" onChange={ this.handleChecked } id="default-state-switch" className="mdl-switch__input" />
                            <span className="mdl-switch__label"></span>
                        </label>
                    </div>
                </div>
             </IntlProvider>
        )
    }
} 



// if (window.ModuwareAPIIsReady) {
//     ApiReadyActions();
// } else {
//     document.addEventListener("WebViewApiReady", () => ApiReadyActions(), { once: true });
// }

//  function speakerButtonClickHandler() {
//     document.getElementById('speaker-button').classList.toggle('active');
//     if (document.getElementById('speaker-button').classList.contains('active')) {
//         console.log('connect')
//         // document.getElementById('speaker-button').classList.remove('active');
//         //   Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'Connect', []);
//     } else {
//         console.log('disconnect')
//         // document.getElementById('speaker-button').classList.add('active');
//         //   Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'Disconnect', []);
//     }
// }



// function MainPageOld() {


//     return (
//         <div id="wrapper" className="wrapper">
//             <div className="page page--main" id="pageMain">
//                 <div id="speaker-control" className="speaker-control" >
//                     <button className="speaker-button" id="speaker-button"><i className="material-icons">power_settings_new</i></button>
//                     {/* <span className="explanation explanation--power-on hidden" id="explanationPowerOn">
//                         To start using speaker module turn it on
//                     </span>
//                     <span className="explanation explanation--connect hidden" id="explanationConnect">
//                         To connect speaker module go to <strong>settings -> bluetooth</strong>, then <strong>pair Moduware speaker</strong>
//                     </span> */}
//                 </div>
//                 {/* <div id="default-state-control" className="default-state-control">
//                     <span>Turn on when plugged in</span>
//                     <label id="default-state-control-label" className="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="default-state-switch">
//                         <input type="checkbox" id="default-state-switch" className="mdl-switch__input" />
//                         <span className="mdl-switch__label"></span>
//                     </label>
//                 </div> */}
//             </div>

//             {/* <div className="page page--main" id="pageMain-zh">
//                 <div id="speaker-control" className="speaker-control" >
//                     <button className="speaker-button" id="speaker-button-zh"><i className="material-icons">power_settings_new</i></button>
//                     <span className="explanation explanation--power-on hidden" id="explanationPowerOn-zh">
//                     请开启扬声器模块以使用
//                     </span>
//                     <span className="explanation explanation--connect hidden" id="explanationConnect-zh">
//                     要连接扬声器模块，请转至<strong>设置 -> 蓝牙</strong>，然后<strong>配对Moduware扬声器</strong>
//                     </span>
//                 </div>
//                 <div id="default-state-control-zh" className="default-state-control">
//                     <span>插入时开启</span>
//                     <label id="default-state-control-label-zh" className="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="default-state-switch-zh">
//                         <input type="checkbox" id="default-state-switch-zh" className="mdl-switch__input" />
//                         <span className="mdl-switch__label"></span>
//                     </label>
//                 </div>
//             </div> */}
//         </div>

//     )
// }

/*global Nexpaq */
function handleBackButtonClick() {
    console.log('header back button clicked!')
    if(typeof Nexpaq !== "undefined") {
      Nexpaq.API.Exit();
    }
}

export default MainPage;
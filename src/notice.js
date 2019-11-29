import React from 'react';
import bugPic from './android-bug-pic.png';
import './MainPage.css';

function Notice (){
    return(
    <div d="wrapper" className="wrapper">
      <div className="page page--bug-notice" id="pageBugNotice">
        <div className="notice">
            <h1 className="notice__title">Important</h1>
              <p className="notice__text">
                We have a bug. On your first connection of speaker module, your phone will redial your last caller.
              </p>
              <img className="notice__picture" src={bugPic} alt="Android Bug Pic"/>
              <p className="notice__text">
                To ensure this only happens once go to <strong>settings -> connections -> bluetooth</strong>, then select
                Moduware Speaker and <strong>switch off "call audio"</strong>
              </p>
        </div>
        <button className="button-connect action-button action-button--red" id="buttonConnectSpeaker">Connect</button>
      </div>

      <div class="page page--main" id="pageMain-zh">
        <div id="speaker-control" class="speaker-control">
          <button class="speaker-button" id="speaker-button-zh"><i class="material-icons">power_settings_new</i></button>
          <span class="explanation explanation--power-on hidden" id="explanationPowerOn-zh">
            请开启扬声器模块以使用
          </span>
          <span class="explanation explanation--connect hidden" id="explanationConnect-zh">
            要连接扬声器模块，请转至<strong>设置 -> 蓝牙</strong>，然后<strong>配对Moduware扬声器</strong>
          </span>
        </div>
        <div id="default-state-control-zh" class="default-state-control">
          <span>插入时开启</span>
          <label id="default-state-control-label-zh" class="mdl-switch mdl-js-switch mdl-js-ripple-effect"
            for="default-state-switch-zh">
            <input type="checkbox" id="default-state-switch-zh" class="mdl-switch__input"/>
            <span class="mdl-switch__label"></span>
          </label>
        </div>
      </div>
    </div>
    )
}

export default Notice;
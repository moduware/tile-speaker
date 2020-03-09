/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { navigate } from '../actions/app.js';
import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { SharedStyles, GlobalStyles, Page, SpeakerButton } from './shared-styles.js';

import { Switch } from '@material/mwc-switch';

import app from '../reducers/app.js';
import './icons.js';

import { powerIcon } from './icons';
import {
	powerOnOff,
	setPowerOnWhenPluginDefaultState
} from '../actions/app.js';

import { translate, get } from "lit-translate";

class HomePage extends connect(store)(PageViewElement) {

	static get properties() {
		return {
			_page: { type: String },
			_powerOn: { type: Boolean },
			_turnOnWhenPlugIn: { type: Boolean }
		};
	}

	constructor() {
		super();
		this._powerOn = false;
	}

	static get styles() {
		return [
			SharedStyles,
			GlobalStyles,
			Page,
			SpeakerButton,

			css`
        h2 {
					color: red;
				}

				.default-state-control {
					position: absolute;
					bottom: 0px; left: 0;
					width: 100%;
					height: 72px;
					display: flex;
					background-color: rgba(0,0,0, 0.28);
					color: rgba(255, 255, 255, 0.87);
					font-size: 16px;
					justify-content: space-between;
					align-items: center;
					padding: 0 15px;
					box-sizing: border-box;
					font-weight: 200;
				}

				mwc-switch {
					--mdc-theme-secondary: #E1514C;
				}

				.explanation {
					position: absolute;
					top: calc(50% - 115px);
					left: 50%;
					-webkit-transform: translateX(-50%) translateY(-50%);
					-moz-transform: translateX(-50%) translateY(-50%);
					-ms-transform: translateX(-50%) translateY(-50%);
					-o-transform: translateX(-50%) translateY(-50%);
					transform: translateX(-50%) translateY(-50%);
					width: 100%;
					max-width: 250px;
					display: block;
					color: #FFFFFF;
					font-family: Roboto, Helvetica, Arial, sans-serif;
					font-size: 14px;
					text-align: center;
				}

				.explanation[hidden] {
					display: none;
				}

      `
		];
	}

	render() {
		return html`
			<div id="wrapper" class="wrapper">
				<div class="page page--main" id="pageMain">
					<div id="speaker-control" class="speaker-control" >
						<!-- <button class="speaker-button" id="speaker-button"><i class="material-icons">power_settings_new</i></button> -->
						<button class="speaker-button" @click="${this.powerButtonClickHandler}" id="speaker-button" ?active="${this._powerOn}" ?disabled="${false}">${powerIcon}</button>
						<span class="explanation explanation--power-on" ?hidden="${this._powerOn}" id="explanationPowerOn">
							${translate('home-page.instruction-poweron')}
						</span>
						<span class="explanation explanation--connect" ?hidden="${!this._powerOn}" id="explanationConnect">
							${translate('home-page.instruction-connect')}
						</span>
					</div>
					<!-- insert default power on switch markup here -->

				</div>
				<!-- default power on when plug in switch -->
				<div id="default-state-control" class="default-state-control">
					<span>${translate('home-page.toggleTurnOn')}</span>
					<mwc-switch @change="${this.defaultSwitchHandler}" ?checked="${this._turnOnWhenPlugIn}"></mwc-switch>
        </div>
			</div>
    `;
	}

	powerButtonClickHandler() {
		store.dispatch(powerOnOff());
	}

	defaultSwitchHandler() {
		store.dispatch(setPowerOnWhenPluginDefaultState());
	}

	stateChanged(state) {
		this._page = state.app.page;
		this._powerOn = state.app.powerOn;
		this._turnOnWhenPlugIn = state.app.turnOnWhenPlugIn;
	}

}

window.customElements.define('home-page', HomePage);

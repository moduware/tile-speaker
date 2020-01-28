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
import app from '../reducers/app.js';
import './icons.js';

import { powerIcon } from './icons';
import { powerOnOff } from '../actions/app.js';

class HomePage extends connect(store)(PageViewElement) {
	
	static get properties() {
		return {
			_page: { type: String },
			_powerOn: { type: Boolean }
		};
	}
	
	constructor() {
		super();
		this._powerOn = true;
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
      `
		];
	}

	render() {
		return html`
			<div id="wrapper" class="wrapper">
				<div class="page page--main" id="pageMain">
					<div id="speaker-control" class="speaker-control" >
						<!-- <button class="speaker-button" id="speaker-button"><i class="material-icons">power_settings_new</i></button> -->
						<button class="speaker-button ${this._powerOn ? 'active' : ''}" @click="${this.powerButtonClickHandler}" id="speaker-button">${powerIcon}</button>
						<span class="explanation explanation--power-on hidden" id="explanationPowerOn">
							To start use speaker module turn it on
						</span>
						<span class="explanation explanation--connect hidden" id="explanationConnect">
							To connect speaker module go to <strong>settings -> bluetooth</strong>, then <strong>pair Moduware speaker</strong>
						</span>
					</div>
					<!-- insert default power on switch markup here -->
				</div>
			</div>
    `;
	}

	powerButtonClickHandler() {
		store.dispatch(powerOnOff());
	}

	stateChanged(state) {
		this._page = state.app.page;
		this._powerOn = state.app.powerOn;
	}

}

window.customElements.define('home-page', HomePage);

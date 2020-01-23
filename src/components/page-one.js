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
import { SharedStyles } from './shared-styles.js';
import app from '../reducers/app.js';
import './icons.js';

class PageOne extends connect(store)(PageViewElement) {
	static get properties() {
		return {
			_page: { type: String }
		};
	}

	static get styles() {
		return [
			SharedStyles,
			css`
        h2 {
					color: red;
        }
      `
		];
	}

	render() {
		return html`
      <section>
				<h2>view 1</h2>
      </section>
    `;
	}

	stateChanged(state) {
		this._page = state.app.page;
	}
}

window.customElements.define('page-one', PageOne);

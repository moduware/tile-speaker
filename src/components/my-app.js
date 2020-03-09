/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
// import { navigate, headerBackButtonClicked, initializeModuwareApiAsync, loadLanguageTranslation } from '../actions/app.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
	navigate,
  headerBackButtonClicked,
  initializeModuwareApiAsync,
  loadLanguageTranslation,
  getPlatform
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import './icons.js';

import 'webview-tile-header/webview-tile-header'

import { registerTranslateConfig, use, translate, get } from "lit-translate";
import * as translation from '../translations/language.js';
import { SharedStyles, GlobalStyles, Page, SpeakerButton } from './shared-styles.js';

class MyApp extends connect(store)(LitElement) {
	static get properties() {
		return {
			appTitle: { type: String },
			_page: { type: String },
			_drawerOpened: { type: Boolean },
      _offline: { type: Boolean },
      _language: { type: String },
      platform: {
        type: String,
        reflect: true
      },
      _webviewHeaderIcon: {type: String }
		};
	}

	static get styles() {
		return [
      GlobalStyles,
			css`
        :host {
          display: block;

          --app-primary-color: #E91E63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;

          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;

          /* padding css variables for android and ios */
          --app-pages-padding-top-android: 45px;
          --app-pages-padding-top-ios: 55px;
        }

        :host([platform="android"]) {
          --app-pages-padding-top: var(--app-pages-padding-top-android);
        }
        :host([platform="ios"]) {
          --app-pages-padding-top: var(--app-pages-padding-top-ios);
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
        }

        [main-title] {
          font-family: 'Pacifico';
          text-transform: lowercase;
          font-size: 30px;
          /* In the narrow layout, the toolbar is offset by the width of the
          drawer button, and the text looks not centered. Add a padding to
          match that button */
          padding-right: 44px;
        }

        .toolbar-list {
          display: none;
        }

        .toolbar-list > a {
          display: inline-block;
          color: var(--app-header-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 24px;
        }

        .toolbar-list > a[selected] {
          color: var(--app-header-selected-color);
          border-bottom: 4px solid var(--app-header-selected-color);
        }

        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }

        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }

        .drawer-list > a[selected] {
          color: var(--app-drawer-selected-color);
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          padding-top: 64px;
          min-height: 100vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {
          padding: 24px;
          background: var(--app-drawer-background-color);
          color: var(--app-drawer-text-color);
          text-align: center;
        }

        moduware-header {
          --text-color: white;
          --back-button-color: white;

          background-color: #DF5250;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
        @media (min-width: 460px) {
          .toolbar-list {
            display: block;
          }

          .menu-btn {
            display: none;
          }

          .main-content {
            padding-top: 107px;
          }

          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      `
		];
	}

	render() {
		return html`
      <!-- Webview Header -->
      <moduware-header
        @back-button-click="${() => store.dispatch(headerBackButtonClicked())}"
				title="${translate('header.title')}">
			</moduware-header>
      <!-- Main content -->
      <!-- <main role="main" class="main-content"> -->
      <morph-pages class="main-content">
        <home-page class="page" ?active="${this._page === 'home-page'}"></home-page>
        <notice-page class="page" ?active="${this._page === 'notice-page'}"></notice-page>
      </morph-pages>
      <!-- </main> -->
    `;
	}

	constructor() {
		super();
		// To force all event listeners for gestures to be passive.
		// See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  // Load the initial language and mark that the strings has been loaded.
  async connectedCallback() {

    /** this is to register the language translation loader from lit-translate */
    registerTranslateConfig({
      loader: (lang) => Promise.resolve(translation[lang])
    });

    super.connectedCallback();
  }

	firstUpdated() {
    store.dispatch(loadLanguageTranslation());
    store.dispatch(getPlatform());
    console.log('platform', this.platform);
    // store.dispatch(navigate("/home-page"));
    if(this.platform === 'ios') {
      store.dispatch(navigate("/home-page"));
    } else {
      store.dispatch(navigate("/notice-page"));
    }
    store.dispatch(initializeModuwareApiAsync());
	}

	updated(changedProperties) {
    use(this._language);
		if (changedProperties.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
			updateMetadata({
        title: pageTitle,
				description: pageTitle
				// This object also takes an image property, that points to an img src.
      });

      if (changedProperties.has('_language')) {
        use(this._language);
      }
		}
  }


	stateChanged(state) {
		this._page = state.app.page;
		this._offline = state.app.offline;
    this._drawerOpened = state.app.drawerOpened;
    this._language = state.app.language;
    this.platform = state.app.platform;
	}
}

window.customElements.define('my-app', MyApp);

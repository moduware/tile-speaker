/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const POWER_ON_OFF = 'POWER_ON_OFF';
export const MODUWARE_API_READY = 'MODUWARE_API_READY';
export const LOAD_LANGUAGE_TRANSLATION = 'LOAD_LANGUAGE_TRANSLATION';

// This is a fix to iOS not auto connecting and not finding any devices
export const initializeModuwareApiAsync = () => async dispatch => {
	let promise = new Promise((resolve, reject) => {
		if (typeof Moduware === 'undefined') {
			document.addEventListener('WebViewApiReady', resolve);
		} else {
			resolve();
		}
	});

	await promise;
	dispatch(moduwareApiReady());
}

export const moduwareApiReady = () => async dispatch => {
	console.log('Moduware API ready!');
	dispatch({ type: MODUWARE_API_READY });
	dispatch(loadLanguageTranslation());

	// Moduware.v1.Bluetooth.addEventListener('ConnectionLost', () => {
	// 	dispatch(connectionLost());
	// });
}

export const navigate = (path) => (dispatch) => {
	const page = path === '/' ? 'home-page' : path.slice(1);
	dispatch(loadPage(page));
};

export const loadLanguageTranslation = () => async dispatch => {
	// let language = Moduware.Arguments.language;
	let language = 'en';
	// console.log(Moduware.Arguments);
	dispatch({ type: LOAD_LANGUAGE_TRANSLATION, language });
}

const loadPage = (page) => (dispatch) => {
	switch (page) {
		case 'home-page':
			import('../components/home-page.js').then((module) => {
				// Put code in here that you want to run every time when
				// navigating to view1 after my-view1.js is loaded.
			});
			break;
		case 'page-one':
			import('../components/page-one.js');
			break;
		case 'page-two':
			import('../components/page-two.js');
			break;
		default:
			page = 'error-page';
			import('../components/error-page.js');
	}

	dispatch(updatePage(page));
};

const updatePage = (page) => {
	return {
		type: UPDATE_PAGE,
		page
	};
};

export const headerBackButtonClicked = () => (dispatch, getState) => {
	console.log('Webview header back button clicked!');
	if (Moduware) {
		if (getState().app.page === 'page-one' || getState().app.page === 'page-two' || getState().app.page === 'error-page') {
			dispatch(navigate('/home-page'))
		} else {
			Moduware.API.Exit();
		}
	}
};

export const powerOnOff = () => async (dispatch, getState) => {
	// disable button
	if(getState().app.powerOn) {
		console.log('turning off now'); 
		if(typeof Moduware !== "undefined") {
			await Moduware.v1.API.Module.ExecuteCommand(Moduware.Arguments.uuid, 'Disconnect', []);
		}
		// enable button
		dispatch({type: POWER_ON_OFF, powerOn: false });
	} else {
		console.log('powering ON now...');
		if (typeof Moduware !== "undefined") {
			await Moduware.v1.API.Module.ExecuteCommand(Moduware.Arguments.uuid, 'Connect', []);
		}
		// enable button
		dispatch({type: POWER_ON_OFF, powerOn: true });
	}
	return {
		type: POWER_ON_OFF
	}
}

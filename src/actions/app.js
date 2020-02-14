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
export const DEFAULT_POWER_ON_PLUGIN = 'DEFAULT_POWER_ON_PLUGIN';
export const GET_PLATFORM = 'GET_PLATFORM';
export const GET_BACK_BUTTON_ICON = 'GET_BACK_BUTTON_ICON';

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
	dispatch({ type: MODUWARE_API_READY });
	dispatch(loadLanguageTranslation());

	Moduware.API.addEventListener('HardwareBackButtonPressed', () => {
		dispatch(hardwareBackButtonPressed());
	});

	Moduware.v1.Module.addEventListener('MessageReceived', (data) => {
		if (data.ModuleUuid !== Moduware.Arguments.uuid) return;
		if (data.Message.dataSource == 'StateChangeResponse' && data.Message.variables.result == 'success') {
			requestSpeakerStatusCheck();
		}

		// upon opening tile, update speaker power button state based on status check
		if (data.Message.dataSource === 'StatusRequestResponse') {
			if (data.Message.variables.status === 'connected') {
				dispatch({ type: POWER_ON_OFF, powerOn: true });
			} else {
				dispatch({ type: POWER_ON_OFF, powerOn: false });
			}
		}

		// upon opening tile, reflect speaker default settings turn on when plug in switch 
		if (Moduware.Arguments.type === 'moduware.module.speaker') {
			if (data.Message.variables.defaultState === 'connected') {
				// default switch set to on
				dispatch({ type: DEFAULT_POWER_ON_PLUGIN, turnOnWhenPlugIn: true })
			}
		}
	});

	requestSpeakerStatusCheck();
}

function requestSpeakerStatusCheck() {
	if (typeof Moduware !== 'undefined') {
		Moduware.v1.Module.ExecuteCommand(Moduware.Arguments.uuid, 'StatusCheck', []);
	}
};

export const navigate = (path) => (dispatch) => {
	const page = path === '/' ? 'home-page' : path.slice(1);
	requestSpeakerStatusCheck();
	dispatch(loadPage(page));
};

export const loadLanguageTranslation = () => async dispatch => {
	let language = Moduware.Arguments.language || 'en';
	// let language = 'en';
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
		case 'notice-page':
			import('../components/notice-page.js');
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
	if (Moduware) {
		if (getState().app.page === 'page-one' || getState().app.page === 'notice-page' || getState().app.page === 'error-page') {
			dispatch(navigate('/home-page'))
		} else {
			Moduware.API.Exit();
		}
	}
};

export const hardwareBackButtonPressed = () => (dispatch) => {
	Moduware.API.Exit();
}

export const powerOnOff = () => async (dispatch, getState) => {
	// disable button while powering on or off
	if (getState().app.powerOn) {
		if (typeof Moduware !== "undefined") {
			await Moduware.v1.Module.ExecuteCommand(Moduware.Arguments.uuid, 'Disconnect', []);
		}
		// enable button after turning off
		dispatch({ type: POWER_ON_OFF, powerOn: false });
	} else {
		if (typeof Moduware !== "undefined") {
			await Moduware.v1.Module.ExecuteCommand(Moduware.Arguments.uuid, 'Connect', []);
		}
		// enable button after powering on
		dispatch({ type: POWER_ON_OFF, powerOn: true });
	}
	return {
		type: POWER_ON_OFF
	}
}

export const setPowerOnWhenPluginDefaultState = () => async (dispatch, getState) => {
	if (getState().app.turnOnWhenPlugIn) {
		if (typeof Moduware !== "undefined") {
			await Moduware.v1.Module.ExecuteCommand(Moduware.Arguments.uuid, 'SetDefaultStateAsOff', []);
		}
		dispatch({ type: DEFAULT_POWER_ON_PLUGIN, turnOnWhenPlugIn: false });
	} else {
		if (typeof Moduware !== "undefined") {
			await Moduware.v1.Module.ExecuteCommand(Moduware.Arguments.uuid, 'SetDefaultStateAsOn', []);
		}
		dispatch({ type: DEFAULT_POWER_ON_PLUGIN, turnOnWhenPlugIn: true });
	}
}

/**
 * function that gets the platform/OS of the device using userAgent
 */
export const getPlatform = () => (dispatch) => {
	let userAgent = navigator.userAgent || navigator.vendor || window.opera;
	let platform = 'unknown';
	
	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		platform = 'windows-phone';
	}

	if (/android/i.test(userAgent)) {
		platform = 'android';
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		platform = 'ios';
	}
	dispatch({ type: GET_PLATFORM, platform });
};

/**
   * Gets either ios or android back button icons depending on platform
   */
export const getBackButtonIcon = () => (dispatch, getState) => {
	let backButtonIcon = './src/components/images/android/back-button.svg';
	if (getState().app.platform == 'ios') {
		backButtonIcon =  './src/components/images/ios/back-button.svg';
	}
	dispatch({ type: GET_BACK_BUTTON_ICON, backButtonIcon });
}
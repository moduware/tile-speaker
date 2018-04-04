// hack for development, as header lib still uses Nexpaq object by default
// And there are no app to create Moduware alias
// if(typeof(Moduware) == 'undefined') {
//   Moduware = Nexpaq;
//   Moduware.Arguments = {}; Moduware.Arguments.type = 'moduware.module.speaker';
// }

let showInstructions = (localStorage.speaker_v1_setting_show_instructions || 'true') == 'true';
let speakerIsConnected = false;
const bluetoothMediaModuleName = 'Moduware Speaker';

function setInstructions(value) {
  showInstructions = value;
  localStorage.speaker_v1_setting_show_instructions = value ? 'true' : 'false';
  renderInstructions();
}

function renderInstructions() {
  if(!showInstructions) {
    document.getElementById('explanationPowerOn').classList.add('hidden');
    document.getElementById('explanationConnect').classList.add('hidden');
    document.getElementById('headerInfoButton').style.opacity = 0.7;
  } else {
    document.getElementById('headerInfoButton').style.opacity = 1;
    if(document.getElementById('speaker-button').classList.contains('active')) {
      document.getElementById('explanationPowerOn').classList.add('hidden');
    } else {
      document.getElementById('explanationPowerOn').classList.remove('hidden');
    }

    if(Moduware.Arguments.type == 'moduware.module.speaker') {
      if(document.getElementById('speaker-button').classList.contains('active')) {
        document.getElementById('explanationConnect').classList.remove('hidden');
      } else {
        document.getElementById('explanationConnect').classList.add('hidden');
      }
    }
  }
}

function showBugNotice() {
  document.getElementById('pageMain').classList.add('hidden');
  document.getElementById('pageBugNotice').classList.remove('hidden');
}

function hideBugNotice() {
  document.getElementById('pageMain').classList.remove('hidden');
  document.getElementById('pageBugNotice').classList.add('hidden');
}

function speakerButtonClickHandler(e) {
  document.getElementById('speaker-button').classList.toggle('active')
  renderInstructions();

  if (this.classList.contains('active')) {
    Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'Connect', []);
  } else {
    Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'Disconnect', []);
  }
}

function defaultStateSwitchClickHandler(e) {
  if(this.checked) {
    Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetDefaultStateAsOn', []);
  } else {
    Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetDefaultStateAsOff', []);
  }
}

function connectSpeakerButtonClickHandler(e) {
  hideBugNotice();
  Moduware.v0.API.BluetoothMediaModuleConnect(bluetoothMediaModuleName);
}

function requestStatus() {
  Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'StatusCheck', []);
}

document.addEventListener('NexpaqAPIReady', function () {
  Moduware.v0.API.Module.addEventListener('DataReceived', function (event) {
    // we don't care about data not related to our module
    if (event.moduleUuid != Moduware.Arguments.uuid) return;
    if (event.dataSource == 'StateChangeResponse' && event.variables.result == 'success') {
      requestStatus();
    }
    if (event.dataSource == 'StatusRequestResponse') {
      if (event.variables.status == 'connected') {
        document.getElementById('speaker-button').classList.add('active');
      } else if(event.variables.status == 'disconnected') {
        document.getElementById('speaker-button').classList.remove('active');
      }
      renderInstructions();
      if(Moduware.Arguments.type == 'moduware.module.speaker') {
				if(event.variables.defaultState == 'connected') {
          document.getElementById('default-state-switch').checked = true;
          document.getElementById('default-state-control-label').classList.add('is-checked');
				} else if(event.variables.defaultState == 'disconnected') {
          document.getElementById('default-state-switch').checked = false;
          document.getElementById('default-state-control-label').classList.remove('is-checked');
				}
			}
    }

  });

  if (typeof(Moduware.Arguments) != 'undefined' && Moduware.Arguments.type == 'nexpaq.module.speaker') {
    document.getElementById('default-state-control').style.display = 'none';
  }

  renderInstructions();
  requestStatus();

  Moduware.v0.API.BluetoothMediaModuleIsPaired(bluetoothMediaModuleName).then(isPaired => {
    if(isPaired) {
      Moduware.v0.API.BluetoothModuleIsConnected(bluetoothMediaModuleName).then(isConnected => {
        if(isConnected) {
          speakerIsConnected = true;
          document.getElementById('buttonConnectSpeaker').textContent = 'Okay';
        }
      });
    }
  });
});

/* =========== ON PAGE LOAD HANDLER */
document.addEventListener('DOMContentLoaded', function (event) {
  Nexpaq.Header.create('Speaker');
  Nexpaq.Header.customize({ color: 'white', iconColor: 'white', backgroundColor: '#E1514C' });
  Nexpaq.Header.hideShadow();
  Nexpaq.Header.addButton({image: 'img/icon-info.svg', id: 'headerInfoButton'}, () => setInstructions(!showInstructions));

  document.getElementById('speaker-button').addEventListener('touchstart', speakerButtonClickHandler);
  document.getElementById('default-state-switch').addEventListener('click', defaultStateSwitchClickHandler);
  document.getElementById('buttonConnectSpeaker').addEventListener('click', connectSpeakerButtonClickHandler);

  if(showInstructions && document.body.classList.contains('platform-android')) {
    showBugNotice();
  }

  renderInstructions();
});

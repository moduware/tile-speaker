// function speakerButtonClickHandler(e) {
//     document.getElementById('speaker-button').classList.toggle('active');
//     if (document.getElementById('speaker-button').classList.contains('active')) {
//         Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'Connect', []);
//       } else {
//         Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'Disconnect', []);
//       }
// }

// function defaultStateSwitchClickHandler(e) {
//     if(this.checked) {
//       Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetDefaultStateAsOn', []);
//     } else {
//       Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetDefaultStateAsOff', []);
//     }
//   }


document.addEventListener('DOMContentLoaded', function (event) {
    Nexpaq.Header.create('Speaker');
    Nexpaq.Header.customize({ color: 'white', iconColor: 'white', backgroundColor: '#E1514C' });
    Nexpaq.Header.hideShadow();
    // document.getElementById('speaker-button').addEventListener('touchstart', speakerButtonClickHandler);

});
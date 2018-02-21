function speakerButtonClickHandler(e) {
	this.classList.toggle('active');

	if(this.classList.contains('active')) {
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Connect', []);
	} else {
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Disconnect', []);
	}
}

function requestStatus() {
	Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StatusCheck', []);
}

document.addEventListener('NexpaqAPIReady', function() {
	Nexpaq.API.Module.addEventListener('DataReceived', function(event) {
      // we don't care about data not related to our module
      if(event.module_uuid != Nexpaq.Arguments[0]) return;
	  if(event.data_source == 'StateChangeResponse' && event.variables.result == 'success') {
		  requestStatus();
	  }
	  if(event.data_source == 'StatusRequestResponse') {
		  if(event.variables.status == 'connected') {
			  document.getElementById('speaker-button').classList.add('active');
		  }
	  }

	});

	requestStatus(); 
});

/* =========== ON PAGE LOAD HANDLER */
document.addEventListener("DOMContentLoaded", function(event) {
	Nexpaq.Header.create('Speaker');
	Nexpaq.Header.customize({color: "white", iconColor:"white", backgroundColor:"#E1514C"});
	Nexpaq.Header.hideShadow();

	document.getElementById('speaker-button').addEventListener('touchstart', speakerButtonClickHandler);
	if(Nexpaq.Arguments[2] == 'nexpaq.module.speaker') {
		document.getElementById('default-state-control').style.display = 'none';
	}
});

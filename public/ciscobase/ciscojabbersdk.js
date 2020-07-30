function onUserAuthorized() {

    // initializeLoginExampleUI();
    // initializeMediaDeviceExampleUI();
    // initializeRingtoneExampleUI();
    // initializeMonitorExampleUI();
    //initializeTelephonyDeviceExampleUI();
    initializeTelephonyDeviceHandlers();
    initializeTelephonyConversationHandlers();
    // initializeCallPickupExampleUI();
    // initializeInvalidCertificateExampleUI();
}

//#region TelephonyDevice
function initializeTelephonyDeviceHandlers() {
    cwic.TelephonyController.addEventHandler('onTelephonyDeviceListChanged', onTelephonyDeviceListChanged);
    cwic.TelephonyController.addEventHandler('onConnectionStateChanged', onConnectionStateChanged);
    cwic.TelephonyController.addEventHandler('onConnectionFailure', onConnectionFailure);
}

function onTelephonyDeviceListChanged() {
    telephonyDevices = cwic.TelephonyController.telephonyDevices;

    var telephonyDevice = telephonyDevices[0];
    var isForceRegistration = false;

    telephonyDevice.connect(isForceRegistration);
}

function onConnectionStateChanged(state) {
    var $ConnectionStateInfo = $('#connectionState');
    $ConnectionStateInfo.text(state);
    if (state === "Connected") {
        // $('#startAudioConversationButton').attr('disabled', false);
        // $('#startVideoConversationButton').attr('disabled', false);
        // $('#selectedDeviceInfo').show();
        cwic.TelephonyController.refreshTelephonyDeviceList();
    }
}

function onConnectionFailure() {

}

function huntGroupLogin() {
    var device = cwic.TelephonyController.getConnectedTelephonyDevice();

    if (device.huntGroupState === "LoggedOut") {
        device.huntGroupLogin();
    }
}

function huntGroupLogout() {
    var device = cwic.TelephonyController.getConnectedTelephonyDevice();

    if (device.huntGroupState === "LoggedIn") {
        device.huntGroupLogout();
    }
}
//#endregion

//#region TelephonyConversation
var selectedConversationID = null;
var telephonyConversations = {};

function initializeTelephonyConversationHandlers() {
    cwic.TelephonyController.addEventHandler('onConversationOutgoing', onConversationStarted);
    cwic.TelephonyController.addEventHandler('onConversationIncoming', onConversationStarted);
    cwic.TelephonyController.addEventHandler('onConversationEnded', onConversationEnded);
    cwic.TelephonyController.addEventHandler('onConversationUpdated', onConversationUpdate);
    cwic.TelephonyController.addEventHandler('onConversationStarted', onConversationStarted);
}

function startAudioConversation() {
    var $TelephonyNumberField = $('#telephonyNumberForConversationText');
    var number = $TelephonyNumberField.val();

    cwic.TelephonyController.startAudioConversation(number)

    $TelephonyNumberField.empty();
}

// function onConversationOutgoing(telephonyConversation) {
//     var ID = telephonyConversation.ID;

//     if (!telephonyConversations[ID]) {
//         addConversationToList(telephonyConversation);
//     } else {
//         updateConversationInfoInList(telephonyConversation);
//     }

//     telephonyConversations[ID] = telephonyConversation;
// }

// function onConversationIncoming(telephonyConversation) {
//     var ID = telephonyConversation.ID;

//     if (!telephonyConversations[ID]) {
//         addConversationToList(telephonyConversation);
//     } else {
//         updateConversationInfoInList(telephonyConversation);
//     }

//     telephonyConversations[ID] = telephonyConversation;
//     updateConversationInfo();
// }

function onConversationStarted(telephonyConversation) {
    var ID = telephonyConversation.ID;

    if (telephonyConversation.callState == 'OffHook') {
        console.log("Start Outbound Call");
        console.log(telephonyConversation);

        selectedConversationID = ID;

        showcallbar("Outbound call..." + telephonyConversation.participants[0].number, telephonyConversation.participants[0].number, "", false);

        telephonyConversations[ID] = telephonyConversation;
        //console.log(telephonyConversations[ID]);
    } else
    if (telephonyConversation.callState == 'Connected') {
        console.log("Connected Outbound Call");
        console.log(telephonyConversation);
        starttimecall();
        document.getElementById("display_result").innerHTML = "Answer";
    }
}

function onConversationEnded(telephonyConversation) {
    console.log("End Call");
    console.log(telephonyConversation);

    var ID = telephonyConversation.ID;

    hidecallbar();

    if (telephonyConversations[ID]) {
        delete telephonyConversations[ID];
    }
}

function onConversationUpdate(telephonyConversation) {
    var ID = telephonyConversation.ID;

    if (telephonyConversations[ID]) {
        telephonyConversations[ID] = telephonyConversation;
    }
}

function iDivert() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.reject();
};

function answerAudio() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.answerAudio();
};

function answerVideo() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.answerVideo();
};

function endCall() {
    console.log("endcall");
    var conversation = telephonyConversations[selectedConversationID];
    conversation.end();
}

function hold() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.hold();
}

function unhold() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.resume();
}

function muteAudio() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.muteAudio();
};

function muteAudio() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.unmuteAudio();
};

function transferConversation(transferNum) {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.transferConversation(transferNum);
}

function completeTransfer() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.completeTransfer();
}

function cancelTransfer() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.cancelTransfer();
}

function onDTMFDigitEntered(numdtmf) {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.sendDTMF(numdtmf);
}
//#endregion
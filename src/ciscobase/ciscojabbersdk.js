import * as actions from '../actions'
import * as types from '../constants/actionTypes';
import { connect } from "react-redux";

export function onUserAuthorized() {

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
export function initializeTelephonyDeviceHandlers() {
    window.cwic.TelephonyController.addEventHandler('onTelephonyDeviceListChanged', onTelephonyDeviceListChanged);
    window.cwic.TelephonyController.addEventHandler('onConnectionStateChanged', onConnectionStateChanged);
    window.cwic.TelephonyController.addEventHandler('onConnectionFailure', onConnectionFailure);
}

export function onTelephonyDeviceListChanged() {
    var telephonyDevices = window.cwic.TelephonyController.telephonyDevices;

    var telephonyDevice = telephonyDevices[0];
    var isForceRegistration = false;

    telephonyDevice.connect(isForceRegistration);
}

export function onConnectionStateChanged(state) {
    if (state === "Connected") {
        window.cwic.TelephonyController.refreshTelephonyDeviceList();
    }
}

export function onConnectionFailure() {
    console.log("connect device faillure")
}

export function huntGroupLogin() {
    var device = window.cwic.TelephonyController.getConnectedTelephonyDevice();

    if (device.huntGroupState === "LoggedOut") {
        device.huntGroupLogin();
    }
}

export function huntGroupLogout() {
    var device = window.cwic.TelephonyController.getConnectedTelephonyDevice();

    if (device.huntGroupState === "LoggedIn") {
        device.huntGroupLogout();
    }
}
//#endregion

//#region TelephonyConversation
var selectedConversationID = null;
var telephonyConversations = {};

export function initializeTelephonyConversationHandlers() {
    window.cwic.TelephonyController.addEventHandler('onConversationOutgoing', onConversationStarted);
    window.cwic.TelephonyController.addEventHandler('onConversationIncoming', onConversationStarted);
    window.cwic.TelephonyController.addEventHandler('onConversationEnded', onConversationEnded);
    window.cwic.TelephonyController.addEventHandler('onConversationUpdated', onConversationUpdate);
    window.cwic.TelephonyController.addEventHandler('onConversationStarted', onConversationStarted);
}

export function startAudioConversation(number) {
    window.cwic.TelephonyController.startAudioConversation(number);
}

// export function onConversationOutgoing(telephonyConversation) {
//     var ID = telephonyConversation.ID;

//     if (!telephonyConversations[ID]) {
//         addConversationToList(telephonyConversation);
//     } else {
//         updateConversationInfoInList(telephonyConversation);
//     }

//     telephonyConversations[ID] = telephonyConversation;
// }

// export function onConversationIncoming(telephonyConversation) {
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

    if (telephonyConversation.callState === 'OffHook') {
        console.log("Start Outbound Call");
        console.log(telephonyConversation);

        connect.dispatch(actions.setDeliveryCall(types.DELIVERY_CALL, ""));

        selectedConversationID = ID;

        telephonyConversations[ID] = telephonyConversation;
    } else
    if (telephonyConversation.callState === 'Connected') {
        console.log("Connected Outbound Call");
        console.log(telephonyConversation);
    }
}

export function onConversationEnded(telephonyConversation) {
    console.log("End Call");
    console.log(telephonyConversation);

    var ID = telephonyConversation.ID;

    if (telephonyConversations[ID]) {
        delete telephonyConversations[ID];
    }
}

export function onConversationUpdate(telephonyConversation) {
    var ID = telephonyConversation.ID;

    if (telephonyConversations[ID]) {
        telephonyConversations[ID] = telephonyConversation;
    }
}

export function iDivert() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.reject();
};

export function answerAudio(conversation) {
    conversation.answerAudio();
};

export function answerVideo(conversation) {
    conversation.answerVideo();
};

export function endCall(conversation) {
    conversation.end();
}

export function hold(conversation) {
    conversation.hold();
}

export function unhold(conversation) {
    conversation.resume();
}

export function muteAudio() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.muteAudio();
}

export function unmuteAudio() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.unmuteAudio();
}

export function transferConversation(transferNum, conversation) {
    // var conversation = telephonyConversations[selectedConversationID];
    conversation.transferConversation(transferNum);
}

export function completeTransfer(conversation) {
    // var conversation = telephonyConversations[selectedConversationID];
    conversation.completeTransfer();
}

export function cancelTransfer() {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.cancelTransfer();
}

export function onDTMFDigitEntered(numdtmf) {
    var conversation = telephonyConversations[selectedConversationID];
    conversation.sendDTMF(numdtmf);
}
//#endregion
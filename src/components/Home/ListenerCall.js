import * as jabbersdk from '../../ciscobase/ciscojabbersdk'
import store from '../../store'

export function RegisterEventListener() {
    window.addEventListener('message', function (message) {

        var lstCmd = message.data.toString().split('|');

        if (lstCmd.length > 1) {
            switch (lstCmd[0]) {
                case "MARKCALL":
                    if (state.telephonyconv === null) {
                        jabbersdk.startAudioConversation(lstCmd[1]);
                        
                        var iframeWin = document.getElementsByTagName("iframe");
                        iframeWin.forEach(element => {
                            element.postMessage({ type: "callresponse", result: true, message: "Call  success" }, "*");
                        });
                    }
                    else {
                        var iframeWin = document.getElementsByTagName("iframe");
                        iframeWin.forEach(element => {
                            element.postMessage({ type: "callresponse", result: false, message: "Exists call now" }, "*");
                        });
                    }
                    break;
                case "ANSWERCALL":
                    let state = store.getState();
                    if (state.telephonyconv !== null) {
                        jabbersdk.answerAudio(state.telephonyconv);

                        var iframeWin = document.getElementsByTagName("iframe");
                        iframeWin.forEach(element => {
                            element.postMessage({ type: "callresponse", result: true, message: "Answer  success" }, "*");
                        });
                    }
                    else{
                        var iframeWin = document.getElementsByTagName("iframe");
                        iframeWin.forEach(element => {
                            element.postMessage({ type: "callresponse", result: false, message: "Not exists call now" }, "*");
                        });
                    }
                    break;
                case "ENDCALL":
                    let state = store.getState();
                    if (state.telephonyconv !== null) {
                        jabbersdk.endCall(state.telephonyconv);
                    }
                    break;
                default:
                    break;
            }
        }

    });
}
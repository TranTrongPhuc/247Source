import { call, put, delay, cancelled, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as types from '../constants/actionTypes'
import * as jabbersdk from '../ciscobase/ciscojabbersdk'
import * as actions from '../actions'
import * as apicaller from '../utils/apicaller'
import * as common from '../utils/common'

export function* ProgressCall() {
    yield takeEvery(types.DELIVERY_CALL, workerDeliveryCall);
    yield takeEvery(types.SET_STATUS_CALL, workerStatusCall);
    yield takeEvery(types.END_CALL, workerEndCall);
}

const getCallCurrent = state => state.callcurrent; // bo chon state trong store
const getUserInfor = state => state.user; // bo chon state trong store
const getCallCapacityCategory = state => state.callcapacitycategory; // bo chon state trong store
const getCallHistory = state => state.callhistory; // bo chon state trong store
const getStateList = state => state.statelist; // bo chon state trong store
const getStateCurrent = state => state.statecurrent; // bo chon state trong store

function* workerDeliveryCall(action) {
    var d = new Date();
    var callid = (Math.random() + d.getTime()).toString(36).substr(2, 9) +
        (Math.random() + d.getTime()).toString(36).substr(2, 9);

    yield put(actions.setCallID(callid));

    switch (action.callinfo.calldirection) {
        case 'Outbound call': {
            if (action.callinfo.callstate_text !== 'Answer') {
                yield call(setStatePreCall);
                yield call(setStateCurrentCall, '1024');
            }
            // else {
            //     yield call(setStateCurrentCall, '64');
            // }
            break;
        }
        case 'Inbound call': {
            yield call(setStatePreCall);
            yield call(setStateCurrentCall, '8');
            break;
        }
        default:
            break;
    }

    const calllog_raw = yield select(getCallCurrent);
    const user = yield select(getUserInfor);

    var callog_savedb = {
        //CallID: calllog_raw.id,
        LinkedID: calllog_raw.id,
        QueueID: '',
        CallPhone: calllog_raw.phone,
        CallStartTime: common.convertTime(Date.now()),
        CallConnectTime: '',
        CallEndTime: '',
        CallStatus: 'START',
        RingTime: 0,
        TalkTime: 0,
        Username: user.username,
        ExtentionID: user.extention,
        InOutCall: calllog_raw.calldirection === "Inbound call" ? 1 : 0,
        CompanyUID: user.companyuid,
        DepartmentUID: user.departmentuid
    }

    yield call(PostCallLogToDatabase, callog_savedb);
    yield put(actions.setCallLog(callog_savedb));
}

function* workerStatusCall() {
    const statecurrent = yield select(getStateCurrent);
    
    if(statecurrent.StateID !== '64'){
        const calllog_raw = yield select(getCallCurrent);

        var callog_savedb = {
            LinkedID: calllog_raw.id,
            CallConnectTime: common.convertTime(Date.now()),
            CallStatus: 'ANSWER'
        }
    
        yield call(setStateCurrentCall, '64');
        yield call(PutCallLogToDatabase, callog_savedb);
        yield put(actions.updateCallLog(callog_savedb));
    }
}

function* workerEndCall() {
    const calllog_raw = yield select(getCallCurrent);

    if (calllog_raw.calldirection === 'Inbound call' && calllog_raw.callstate_text === '') {
        yield call(setStateCurrentCall, '10004');
    }
    else {
        yield call(setStateCurrentCall, '128');
    }

    const callcapacitycategory = yield select(getCallCapacityCategory);

    var callog_savedb = {
        LinkedID: calllog_raw.id,
        CallEndTime: common.convertTime(Date.now()),
        CallStatus: calllog_raw.callstate_text === 'Answer' ? "SUCCESS" : "NOANSWER"
    }

    yield call(PutCallLogToDatabase, callog_savedb);
    yield put(actions.endCallLog(callog_savedb));
    yield call(UpdatePercentCall);

    var d = new Date();
    if (callcapacitycategory.slice(-1)[0] !== d.getHours()) {
        yield put(actions.setAddCapacityCaregory(d.getHours()));
        yield put(actions.setAddLast(''));
    }

    switch (calllog_raw.callstate_text) {
        case "Answer":
            yield put(actions.setIncrementLast("Handle Call"));
            break;
        default:
            yield put(actions.setIncrementLast("Not Handle Call"));
    }

    yield put(actions.endCallFinish());
}

function* setStateCurrentCall(StateID) {
    var statecurrent = (yield select(getStateList)).find(x => x.StateID === StateID);
    yield put(actions.setStateCurrent(statecurrent));
}

function* setStatePreCall() {
    var statecurrent = yield select(getStateCurrent)
    yield put(actions.setStatePre(statecurrent));
}

function* PostCallLogToDatabase(calllog) {
    yield apicaller.CallApiAuth("historycallagent", "POST", calllog)
}

function* PutCallLogToDatabase(calllog) {
    yield apicaller.CallApiAuth("historycallagent?update=true", "POST", calllog).catch(err => {
        console.log(err);
    })
}

function* UpdatePercentCall() {
    const callhistory = yield select(getCallHistory);

    const listInboundSuccess = callhistory.filter(x => x.InOutCall === 1 && x.CallStatus === 'SUCCESS');
    const listInboundNotHandle = callhistory.filter(x => x.InOutCall === 1 && x.CallStatus === 'NOANSWER');
    const listOutboundSuccess = callhistory.filter(x => x.InOutCall === 0 && x.CallStatus === 'SUCCESS');
    const listOutboundNotHandle = callhistory.filter(x => x.InOutCall === 0 && x.CallStatus === 'NOANSWER');

    const CallPercent = [{
        name: 'Percent Call',
        data: [
            {
                name: 'In success',
                y: listInboundSuccess.length,
                color: '#3498db'
            },
            {
                name: 'In not handle',
                y: listInboundNotHandle.length,
                color: '#9b59b6'
            },
            {
                name: 'Out success',
                y: listOutboundSuccess.length,
                color: '#2ecc71'
            },
            {
                name: 'Out not handle',
                y: listOutboundNotHandle.length,
                color: '#f1c40f'
            }]
    }]

    yield put(actions.setPercentCall(CallPercent));
}
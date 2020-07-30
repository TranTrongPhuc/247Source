import { call, put, delay, cancelled, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as types from '../constants/actionTypes'
import * as jabbersdk from '../ciscobase/ciscojabbersdk'
import * as actions from '../actions'
import * as common from '../utils/common'
import * as apicaller from '../utils/apicaller'

export function* ProgressState() {
    yield takeLatest(types.LOOP_STATE_WRAPUP, workerLoopStateWrapup);
    yield takeEvery(types.SET_STATE_CURRENT, workerSetStateCurrent);
}

const getStateCurrent = state => state.statecurrent; // bo chon state trong store
const getStateSavePre = state => state.statesavepre; // bo chon state trong store
const getUserInfor = state => state.user; // bo chon state trong store
const getCallCurrent = state => state.callcurrent; // bo chon state trong store
const getStateHistory = state => state.statehistory; // bo chon state trong store
const getConfigCompany = state => state.configcompany; // bo chon state trong store

function* workerSetStateCurrent(action) {
    if (action.statecurrent.IsNotReady || action.statecurrent.StateID === '128') { // 128 - Wrapup
        jabbersdk.huntGroupLogout();
    }
    else {
        jabbersdk.huntGroupLogin();
    }

    const user = yield select(getUserInfor);
    const calllog_raw = yield select(getCallCurrent);

    var state_savedb = {
        ExtentionID: user.extention,
        StateID: action.statecurrent.StateID,
        StateName: action.statecurrent.StateName,
        Username: user.username,
        Datetime: common.convertTime(Date.now()),
        LinkedID: action.statecurrent.IsHide ? calllog_raw.id : '',
        IsManualSet: !action.statecurrent.IsHide,
        IsSystemSet: action.statecurrent.IsHide,
        IsNotReady: action.statecurrent.IsNotReady,
        CompanyUID: user.companyuid,
        DepartmentUID: user.departmentuid,
        Duration: 0
    }

    yield call(PostStateLogToDatabase, state_savedb);
    yield put(actions.updateStateLog());
    yield put(actions.setStateLog(state_savedb));
    yield call(UpdatePercentState);
}

function* workerLoopStateWrapup() {
    while (true) {
        
        yield delay(3000);
        
        const statecurrent = yield select(getStateCurrent);
        const wrapup_time = (yield select(getConfigCompany))[0].C247M_WrapUpTime;

        if (statecurrent.StateID === '128' && common.diffTimeToSeconds(statecurrent.Datetime, Date.now()) >= wrapup_time) {
            const statesavepre = yield select(getStateSavePre);
            yield put(actions.setStateCurrent(statesavepre));
        }
    }
}

function* PostStateLogToDatabase(state) {
    yield apicaller.CallApiAuth("historystate", "POST", state)
}

function* UpdatePercentState() {
    const statehistory = yield select(getStateHistory);

    const listNotReady = statehistory.filter(x => x.IsNotReady === true);
    const listReady = statehistory.filter(x => x.StateID === '0');
    const listRinging = statehistory.filter(x => x.StateID === '8');
    const listDialing = statehistory.filter(x => x.StateID === '1024');
    const listTalking = statehistory.filter(x => x.StateID === '64');
    const listWrapUp = statehistory.filter(x => x.StateID === '128');

    var StatePercent = {
        name: 'Percent state',
        data: [
            {
                name: 'Not ready',
                y: listNotReady.reduce((total, listNotReady) => total + listNotReady.Duration, 0),
                color: '#ff5050'
            },
            {
                name: 'Ready',
                y: listReady.reduce((total, listReady) => total + listReady.Duration, 0),
                color: '#00ff00'
            },
            {
                name: 'Ringing',
                y: listRinging.reduce((total, listRinging) => total + listRinging.Duration, 0),
                color: '#ff9933'
            },
            {
                name: 'Dialing',
                y: listDialing.reduce((total, listDialing) => total + listDialing.Duration, 0),
                color: '#cc9900'
            },
            {
                name: 'TalKing',
                y: listTalking.reduce((total, listTalking) => total + listTalking.Duration, 0),
                color: '#3366ff'
            },
            {
                name: 'Wrapup',
                y: listWrapUp.reduce((total, listWrapUp) => total + listWrapUp.Duration, 0),
                color: '#6600cc'
            }
        ]
    }

    yield put(actions.setPercentState(StatePercent));
}
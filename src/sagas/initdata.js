import { call, put, delay, cancelled, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as types from '../constants/actionTypes'
import * as actions from '../actions'
import * as common from '../utils/common'
import * as apicaller from '../utils/apicaller'

const getUserInfor = state => state.user; // bo chon state trong store
const getStateHistory = state => state.statehistory; // bo chon state trong store
const getCallHistory = state => state.callhistory; // bo chon state trong store

export function* InitData() {
  yield takeEvery(types.INIT_DATADASHBOARD, workerInitDataDashboard);
}

function* workerInitDataDashboard() {
  const user = yield select(getUserInfor);

  var result;

  yield apicaller.CallApiAuth(`historycallagent?username=${user.username}&extention=${user.extention}`, "GET", null)
    .then(res => {
      result = res.data;
    })

  var initCallcapacityData = [
    {
      name: 'Total Call',
      color: '#4e73df',
      data: []
    },
    {
      name: 'Handle Call',
      color: '#1cc88a',
      data: []
    },
    {
      name: 'Not Handle Call',
      color: '#e74a3b',
      data: []
    }
  ]

  var initCallcapacityCategory = []

  result.map((item, index) => {
    initCallcapacityCategory.push(item.HourCall)
    initCallcapacityData[0].data.push(item.TotalCall);
    initCallcapacityData[1].data.push(item.TotalHandle);
    initCallcapacityData[2].data.push(item.TotalNotHandle);
  })

  yield put(actions.setAddCapacityCaregoryList(initCallcapacityCategory));
  yield put(actions.setInitCallCapacity(initCallcapacityData));

  var result02;

  yield apicaller.CallApiAuth(`historystate?username=${user.username}&extention=${user.extention}`, "GET", null)
    .then(res => {
      result02 = res.data;
    })

  yield put(actions.setInitStateLog(result02));
  yield call(UpdatePercentState);

  var result03;

  yield apicaller.CallApiAuth(`historycallagent?username=${user.username}&extention=${user.extention}&bGetFirstHistoryCall=true`, "GET", null)
    .then(res => {
      result03 = res.data;
    })

  yield put(actions.setInitCallLog(result03));
  yield call(UpdatePercentCall);
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
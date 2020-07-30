import * as types from '../constants/actionTypes'
import * as common from '../utils/common'

const initialCallHistory = []

const callhistory = (state = initialCallHistory, action) => {
    switch (action.type) {
        case types.SET_CALLLOG:
            return [
                ...state,
                action.callLog
            ]
        case types.UPDATE_CALLLOG:
            var update_item = state.find(x => x.LinkedID === action.callLog.LinkedID);
            return [
                ...state.filter(x => x.LinkedID !== action.callLog.LinkedID),
                {
                    ...update_item,
                    CallStatus: action.callLog.CallStatus,
                    CallConnectTime: action.callLog.CallConnectTime,
                    RingTime: common.diffTimeToSeconds(update_item.CallStartTime, action.callLog.CallConnectTime)
                }
            ]
        case types.END_CALLLOG:
            var update_item = state.find(x => x.LinkedID === action.callLog.LinkedID);
            return [
                ...state.filter(x => x.LinkedID !== action.callLog.LinkedID),
                {
                    ...update_item,
                    CallStatus: action.callLog.CallStatus,
                    CallEndTime: action.callLog.CallEndTime,
                    RingTime: (action.callLog.CallStatus === "NOANSWER" ?
                        common.diffTimeToSeconds(update_item.CallStartTime, action.callLog.CallEndTime) :
                        update_item.RingTime),
                    TalkTime: (action.callLog.CallStatus === "SUCCESS" ?
                        common.diffTimeToSeconds(update_item.CallConnectTime, action.callLog.CallEndTime) : 0)
                }
            ]
        case types.SET_INIT_CALLLOG:
            return action.data
        default:
            return state
    }
}

export default callhistory
import * as types from '../constants/actionTypes'
import telephonydevice from '../reducers/telephonydevice'
import statecurrent from '../reducers/statecurrent'

export const setDeliveryCall = callinfo => ({
    type: types.DELIVERY_CALL,
    callinfo
})

export const setStatusCall = callinfo => ({
    type: types.SET_STATUS_CALL,
    callinfo
})

export const endCall = () => ({
    type: types.END_CALL
})

export const endCallFinish = () => ({
    type: types.END_CALL_FINISH
})

export const setCallID = callid => ({
    type: types.SET_CALLID,
    callid
})

export const setCallLog = callLog => ({
    type: types.SET_CALLLOG,
    callLog
})

export const updateCallLog = callLog => ({
    type: types.UPDATE_CALLLOG,
    callLog
})

export const endCallLog = callLog => ({
    type: types.END_CALLLOG,
    callLog
})

export const countTime = counttime => ({
    type: types.COUNTTIME,
    counttime
})

export const setTelephonyConv = telephonyconv => ({
    type: types.SET_TELEPHONYCONV,
    telephonyconv
})

export const clearTelephonyConv = () => ({
    type: types.CLEAR_TELEPHONYCONV
})

export const setTelephonyDevice = telephonydevice => ({
    type: types.SET_TELEPHONYDEVICE,
    telephonydevice
})

export const clearTelephonyDevice = () => ({
    type: types.CLEAR_TELEPHONYDEVICE
})

export const setListState = liststate => ({
    type: types.SET_LIST_STATE,
    liststate
})

export const startLoopStateWrapUp = () => ({
    type: types.LOOP_STATE_WRAPUP
})

export const setStateCurrent = statecurrent => ({
    type: types.SET_STATE_CURRENT,
    statecurrent
})

export const setStatePre = statepre => ({
    type: types.SET_STATE_PRE,
    statepre
})

export const setStateLog = statelog => ({
    type: types.SET_STATELOG,
    statelog
})

export const updateStateLog = () => ({
    type: types.UPDATE_STATELOG
})

export const setUser = user => ({
    type: types.SET_USER,
    user
})

export const setUserName = user => ({
    type: types.SET_USERNAME_EXTENTION,
    user
})

export const setConfigConpany = configcompany => ({
    type: types.SET_CONFIG_COMPANY,
    configcompany
})

export const setListScreenWork = listscreen => ({
    type: types.SET_LIST_SCREEN,
    listscreen
})

export const setActiveScreen = screenid => ({
    type: types.SET_ACTIVE_SCREEN,
    screenid
})

export const initPopUp = popupmanager => ({
    type: types.INIT_POPUP,
    popupmanager
})

export const SetPopUp = popup => ({
    type: types.SET_POPUP,
    popup
})

export const closePopUp = (ScreenUID, id) => ({
    type: types.CLOSE_POPUP,
    popup:{
        ScreenUID,
        id
    }
})

export const choicePopUp = (ScreenUID, id) => ({
    type: types.CHOICE_POPUP,
    popup:{
        ScreenUID,
        id
    }
})

// dashboard agent
export const initDataDashboard = () => ({
    type: types.INIT_DATADASHBOARD,
})

export const setInitCallCapacity = (data) => ({
    type: types.SET_INIT_CALLCAPACITY,
    data
})

export const setInitCallLog = (data) => ({
    type: types.SET_INIT_CALLLOG,
    data
})
export const setIncrementLast = (typepara) => ({
    type: types.INCREMENT_LAST,
    typepara
})

export const setDecrementLast = (typepara) => ({
    type: types.DECREMENT_LAST,
    typepara
})

export const setAddLast = (typepara) => ({
    type: types.ADD_LAST,
    typepara
})

export const setAddCapacityCaregory = (new_category) => ({
    type: types.ADD_CAPACITYCATEGORY,
    new_category
})

export const setAddCapacityCaregoryList = (data) => ({
    type: types.ADD_CAPACITYCATEGORY_LIST,
    data
})

export const setInitStateLog = (data) => ({
    type: types.SET_INIT_STATELOG,
    data
})

export const setPercentState = percentstate => ({
    type: types.SET_PERCENTSTATE,
    percentstate
})

export const setPercentCall = percentcall => ({
    type: types.SET_PERCENTCALL,
    percentcall
})


// dashboard sub
export const init_DATA_DASHBOARD_SUB = () => ({
    type: types.INIT_DATA_DASHBOARD_SUB,
})

export const set_DATA_ITEM_DASHBOARD_SUB = (data) => ({
    type: types.SET_DATA_ITEM_DASHBOARD_SUB,
    data
})

export const set_DATA_CHART_SUB = (data) => ({
    type: types.SET_DATA_CHART_SUB,
    data
})

export const set_CATEGORY_CHART_SUB = (data) => ({
    type: types.SET_CATEGORY_CHART_SUB,
    data
})
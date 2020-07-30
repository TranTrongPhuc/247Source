import * as types from '../constants/actionTypes'

const initialState = {
    id: '',
    calldirection: '',
    phone: '',
    extention: '',
    callstate: '',
    callstate_text: '',
    counttime: '',
    classframecall: 'frame_hide',
    classbtnaccept: 'btnanswer_hide',
    btnaccept_active: false,
    btndrop_active: false,
    btnhold_active: false,
    btntransfer_active: false,
}

const callcurrent = (state = initialState, action) => {
    switch (action.type) {
        case types.DELIVERY_CALL:
            return {
                id: action.callinfo.id,
                calldirection: action.callinfo.calldirection,
                phone: action.callinfo.phone,
                extention: action.callinfo.extention,
                callstate: action.callinfo.callstate,
                callstate_text: '',
                counttime: '',
                classframecall: "frame_show",
                classbtnaccept: action.callinfo.classbtnaccept,
                btnaccept_active: action.callinfo.btnaccept_active,
                btndrop_active:  action.callinfo.btndrop_active,
                btnhold_active:  action.callinfo.btnhold_active,
                btntransfer_active:  action.callinfo.btntransfer_active
            }
        case types.SET_STATUS_CALL:
            return {
                ...state,
                callstate: action.callinfo.callstate != null ? action.callinfo.callstate : state.callstate,
                callstate_text: action.callinfo.callstate_text,
                classbtnaccept: action.callinfo.classbtnaccept,
                btnaccept_active: action.callinfo.btnaccept_active,
                btndrop_active:  action.callinfo.btndrop_active,
                btnhold_active:  action.callinfo.btnhold_active,
                btntransfer_active:  action.callinfo.btntransfer_active
            }
        case types.SET_CALLID:
            return { ...state, id: action.callid };
        case types.END_CALL:
            return state
        case types.END_CALL_FINISH:
            return {
                id: '',
                calldirection: '',
                phone: '',
                extention: '',
                callstate: '',
                callstate_text: '',
                counttime: '',
                classframecall: 'frame_hide',
                classbtnaccept: 'btnanswer_hide',
                btnaccept_active: false,
                btndrop_active: false,
                btnhold_active: false,
                btntransfer_active: false
            }
        case types.COUNTTIME:
            // update 1 propeties in object redux
            return { ...state, counttime: action.counttime };
        default:
            return state
    }
}

export default callcurrent
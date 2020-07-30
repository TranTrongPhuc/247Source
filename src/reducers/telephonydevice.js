import * as types from '../constants/actionTypes'

const initialState = {}

const telephonydevice = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TELEPHONYDEVICE:
            state = action.telephonydevice;
            return state;
        case types.CLEAR_TELEPHONYDEVICE:
            return {
                state: null
            }
        default:
            return state
    }
}

export default telephonydevice
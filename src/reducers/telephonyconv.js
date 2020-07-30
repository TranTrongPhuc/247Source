import * as types from '../constants/actionTypes'

const initialState = {}

const telephonyconv = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TELEPHONYCONV:
            state = action.telephonyconv;
            return state;
        case types.CLEAR_TELEPHONYCONV:
            return {
                state: null
            }
        default:
            return state
    }
}

export default telephonyconv
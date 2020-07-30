import * as types from '../constants/actionTypes'
import * as common from '../utils/common'

const initialStateHistory = []

const statehistory = (state = initialStateHistory, action) => {
    switch (action.type) {
        case types.SET_STATELOG:
            return [
                ...state,
                action.statelog
            ]
        case types.UPDATE_STATELOG:
            if (state.slice(-1)[0] !== undefined) {
                return [
                    ...state.slice(0, state.length - 1),
                    {
                        ...state.slice(-1)[0],
                        Duration: common.diffTimeToSeconds(state.slice(-1)[0].Datetime, Date.now())
                    }
                ]
            }
            else {
                return state
            }
        case types.SET_INIT_STATELOG:
            return action.data
        default:
            return state
    }
}

export default statehistory
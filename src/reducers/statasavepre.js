import * as types from '../constants/actionTypes'

const initialState = {
    StateID: 10002,
    StateName: 'Not ready - Orther',
    IsNotReady: false,
    Color: 'RED',
    IsSavePreState: false
}

const statasavepre = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_STATE_PRE:
            //state = action.statepre;
            //return state;
            if (action.statepre.StateID !== '128') {
                return {
                    StateID: action.statepre.StateID,
                    StateName: action.statepre.StateName,
                    IsNotReady: action.statepre.IsNotReady,
                    Color: action.statepre.Color,
                    IsSavePreState: action.statepre.IsSavePreState
                }
            }
            else
                return state;
        case types.CLEAR_STATE_PRE:
            return {
                state: null
            }
        default:
            return state
    }
}

export default statasavepre
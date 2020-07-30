import * as types from '../constants/actionTypes'

const initialState = {
    StateID: 10002,
    StateName: 'Not ready - Orther',
    IsNotReady: false,
    Color: 'RED',
    IsSavePreState: false,
    Datetime: ''
}

const statecurrent = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_STATE_CURRENT:
            return {
                StateID: action.statecurrent.StateID,
                StateName: action.statecurrent.StateName,
                IsNotReady: action.statecurrent.IsNotReady,
                Color: action.statecurrent.Color,
                IsSavePreState: action.statecurrent.IsSavePreState,
                Datetime: Date.now()
            }
        case types.GET_STATE_CURRENT:
            return {
                state: null
            }
        default:
            return state
    }
}

export default statecurrent
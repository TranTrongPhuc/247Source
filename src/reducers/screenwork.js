import * as types from '../constants/actionTypes'

const initialState = []

const screenwork = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LIST_SCREEN:
            state = action.listscreen;
            return state;
        case types.SET_ACTIVE_SCREEN:
            return state.map(screen => {
                if (screen.ScreenUID === action.screenid) {
                    return {...screen, IsActive: true }
                } else {
                    return {...screen, IsActive: false }
                }
            });
        case types.GET_LIST_SCREEN:
            return state;
        default:
            return state
    }
}

export default screenwork
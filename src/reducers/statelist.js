import * as types from '../constants/actionTypes'

const initialState = []

const statelist = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LIST_STATE:
            state = action.liststate;
            return state;
        case types.GET_LIST_STATE:
            return state;
        default:
            return state
    }
}

export default statelist
import * as types from '../constants/actionTypes'

const initialState = {}


const configcompany = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CONFIG_COMPANY:
            state = action.configcompany;
            return state;
        default:
            return state
    }
}

export default configcompany
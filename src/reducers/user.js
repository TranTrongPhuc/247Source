import * as types from '../constants/actionTypes'

const initialState = {
    username: '',
    displayname: '',
    companyuid: '',
    departmentuid: '',
    extention: '',
    acountdiscoverycucm: '',
    acountcucm: '',
    passwordcucm: '',
    issupervisor: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            // console.log(action);
            state = action.user;
            return state;
        case types.UPDATE_USER:
            state.companyuid = action.companyuid;
            state.departmentuid = action.departmentuid;
            state.extention = action.extention;
            return state;
        case types.SET_USERNAME_EXTENTION:
            state.username = action.user.username;
            state.extention = action.user.extention;
            return state;
        case types.UPDATE_INFORCUCM:
            state.acountcucm = action.acountcucm;
            state.passwordcucm = action.passwordcucm;
            return state;
        case types.CLEAR_USER:
            return {
                username: '',
                displayname: '',
                companyuid: '',
                departmentuid: '',
                extention: '',
                acountdiscoverycucm: '',
                acountcucm: '',
                passwordcucm: '',
                issupervisor: false
            }
        default:
            return state
    }
}

export default user
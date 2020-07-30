import * as types from '../constants/actionTypes'

const initialState = []

const screenpoplist = (state = initialState, action) => {
    switch (action.type) {
        case types.INIT_POPUP:
            return [
                ...state,
                action.popupmanager
            ]
        case types.SET_POPUP:
            return state.map((popupmanager) => (
                popupmanager.ScreenUID === action.popup.ScreenUID ? {
                    ...popupmanager, ListPopUp: [
                        ...popupmanager.ListPopUp.map((popup) => {
                            return { ...popup, active: false }
                        }),
                        action.popup
                    ],
                } : popupmanager
            ))
        case types.CHOICE_POPUP:
            return state.map((popupmanager) => (
                popupmanager.ScreenUID === action.popup.ScreenUID ? {
                    ...popupmanager, ListPopUp: [
                        ...popupmanager.ListPopUp.map((popup) => {
                            if (popup.id === action.popup.id)
                                return { ...popup, active: true }
                            else
                                return { ...popup, active: false }
                        })
                    ],
                } : popupmanager
            ))
        case types.CLOSE_POPUP:
            return state.map((popupmanager) => (
                popupmanager.ScreenUID === action.popup.ScreenUID ? {
                    ...popupmanager, ListPopUp: [
                        ...popupmanager.ListPopUp.filter(popup => popup.id != action.popup.id)
                    ],
                } : popupmanager
            ))
        default:
            return state
    }
}

export default screenpoplist
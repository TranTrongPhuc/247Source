import * as types from '../constants/actionTypes'

const initialStateItem = {
    AgentLogin: '',
    AgentTalk: '',
    InboundAvailble: '',
    InboundCall: '',
    HandleCall: '',
    Rate: '',
    Abadoned: '',
    LongestTalk: '',
    LongestWait: '',
    AvgTalkTime:'',
    AvgWaitTime:'',
    Rate:'',
}
export const dashboardsubItem = (state = initialStateItem, action) => {
    switch (action.type) {
        case types.SET_DATA_ITEM_DASHBOARD_SUB:
            return action.data
        default:
            return state
    }
}

const initCallChartData = []
export const dashsubcallchartdata = (state = initCallChartData, action) => {
    switch (action.type) {
        case types.SET_DATA_CHART_SUB:
            return action.data
        default:
            return state
    }
}
const initcallcategory = []
export const dashsubcallcategory = (state = initcallcategory, action) => {
    switch (action.type) {
        case types.SET_CATEGORY_CHART_SUB:
            return action.data
        default:
            return state
    }
}


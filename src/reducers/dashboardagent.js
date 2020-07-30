import * as types from '../constants/actionTypes'

const initCallcapacityData = [
    {
        name: 'Total Call',
        color:'#4e73df',
        data: []
    },
    {
        name: 'Handle Call',
        color:'#1cc88a',
        data: []
    },
    {
        name: 'Not Handle Call',
        color:'#e74a3b',
        data: []
    }
]

export const callcapacitydata = (state = initCallcapacityData, action) => {
    switch (action.type) {
        case types.INCREMENT_LAST:
            return state.map((capacity) => (
                {
                    ...capacity, data: [
                        ...capacity.data.slice(0, capacity.data.length - 1),
                        capacity.name === "Total Call" || capacity.name === action.typepara ?
                            capacity.data.slice(-1)[0] + 1 : capacity.data.slice(-1)[0]
                    ],
                }
            ))
        case types.DECREMENT_LAST:
            break;
        case types.ADD_LAST:
            return state.map((capacity) => (
                {
                    ...capacity, data: [
                        ...capacity.data,
                        action.typepara === '' ? 0 :
                            (capacity.name === "Total Call" || capacity.name === action.typepara ? 1 : 0)
                    ],
                }
            ))
        case types.SET_INIT_CALLCAPACITY:
            return action.data
        default:
            return state
    }
}

const initCallcapacityCategory = []

export const callcapacitycategory = (state = initCallcapacityCategory, action) => {
    switch (action.type) {
        case types.ADD_CAPACITYCATEGORY:
            return [
                ...state,
                action.new_category
            ]
        case types.ADD_CAPACITYCATEGORY_LIST:
            return action.data
        default:
            return state
    }
}

const initStatePercent = [{
    name: 'Percent state',
    data: [
        {
            name: 'Not ready',
            y: 0.0,
            color: '#3498db'
        },
        {
            name: 'Ready',
            y: 0.0,
            color: '#9b59b6'
        },
        {
            name: 'Ringing',
            y: 0.0,
            color: '#2ecc71'
        },
        {
            name: 'Dialing',
            y: 0.0,
            color: '#f1c40f'
        },
        {
            name: 'TalKing',
            y: 0.0,
            color: '#f1c40f'
        },
        {
            name: 'Wrapup',
            y: 0.0,
            color: '#f1c40f'
        }
    ]
}]

export const statepercent = (state = initStatePercent, action) => {
    switch (action.type) {
        case types.SET_PERCENTSTATE:
            return action.percentstate
        default:
            return state
    }
}

const initCallPercent = [{
    name: 'Percent Call',
    data: [
        {
            name: 'Inbound success',
            y: 0.0,
            color: '#3498db'
        },
        {
            name: 'Inbound not handle',
            y: 0.0,
            color: '#9b59b6'
        },
        {
            name: 'Outbound success',
            y: 0.0,
            color: '#2ecc71'
        },
        {
            name: 'Outbound not handle',
            y: 0.0,
            color: '#f1c40f'
        }
    ]
}]

export const callpercent = (state = initCallPercent, action) => {
    switch (action.type) {
        case types.SET_PERCENTCALL:
            return action.percentcall
        default:
            return state
    }
}
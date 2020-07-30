import { combineReducers } from 'redux'
import callcurrent from './callcurrent'
import callhistory from './callhistory'
import telephonyconv from './telephonyconv'
import telephonydevice from './telephonydevice'
import statelist from './statelist'
import statecurrent from './statecurrent'
import statesavepre from './statasavepre'
import statehistory from './statehistory'
import user from './user'
import configcompany from './configcompany'
import screenwork from './screenwork'
import screenpoplist from './screenpoplist'
import { callcapacitydata, callcapacitycategory, statepercent, callpercent } from './dashboardagent'
import { dashsubcallchartdata,dashsubcallcategory,dashboardsubItem } from './dashboardasup'

export default combineReducers({
    callcurrent,
    callhistory,
    callpercent,
    telephonyconv,
    telephonydevice,
    statelist,
    statecurrent,
    statesavepre,
    statehistory,
    statepercent,
    user,
    configcompany,
    screenwork,
    screenpoplist,
    callcapacitydata,
    callcapacitycategory,
    dashboardsubItem,
    dashsubcallchartdata,
    dashsubcallcategory
    
})
import { hubConnection, signalR } from 'signalr-no-jquery';
import * as config from '../../constants/config'
import * as apicaller from '../../utils/apicaller'
import store from '../../store'
import * as jabbersdk from '../../ciscobase/ciscojabbersdk'
import * as actions from '../../actions';

const connection = hubConnection(config.UrlSignalr);

export const hubProxy = connection.createHubProxy('baseHub');

export function InitSignalr() {

    let state = store.getState();

    console.log(store);

    connection.start({ jsonp: true })
        .done(function () {
            console.log('Now connected, connection ID=' + connection.id);

            apicaller.CallApiAuth(`registerhub?extention=${state.user.extention}&connectionid=${connection.id}`, 'POST', null)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err)
                });
        })
        .fail(function () {
            console.log('Could not connect');
        });
}

export function ReceiveEventServer() {
    hubProxy.on('MarkCallByServer', function (phone) {
        jabbersdk.startAudioConversation(phone);
    });

    hubProxy.on('AnswerByServer', function () {
        let state = store.getState();
        jabbersdk.answerAudio(state.telephonyconv);
    });

    hubProxy.on('EndCallByServer', function () {
        let state = store.getState();
        jabbersdk.endCall(state.telephonyconv);
    });

    hubProxy.on('JoinCallByServer', function (extention, phone) {

    });

    // hubProxy.on('PushDataSupervisorMonitoring', function (listExt_state, listTeamManager) {
    //     console.log(listExt_state);
    //     console.log(listTeamManager);
    //     store.dispatch(actions.setAgentsStatelist(listExt_state));
    //     store.dispatch(actions.setListTeamManager(listTeamManager));
    // });

    // hubProxy.on('PushDataSupervisorMonitoringAgentDetail', function (listHisCallAgent, listHistoryState) {
    //     console.log(listHisCallAgent);
    //     console.log(listHistoryState);
    //     store.dispatch(actions.setAgentHistoryCallList(listHisCallAgent));
    //     store.dispatch(actions.setAgentHistoryStateList(listHistoryState));
    // });

    hubProxy.on('DaskboardInfo', function (obj) {
        let CategoryChart =  []
        let dataChart =  [{name: 'Handled Calls',color:'#4e73df',data: []},
                          {name: 'Abandoned Calls',color:'#e74a3b', data: []}]
        obj.queueinfo.map((item)=>{
            CategoryChart.push(item.QueueName);
            dataChart[0].data.push(parseInt(item.HandleCall, 10));
            dataChart[1].data.push(parseInt(item.AbandonedCall, 10));
        });
       // console.log(CategoryChart,dataChart,obj);
        store.dispatch(actions.set_DATA_ITEM_DASHBOARD_SUB(obj));
        store.dispatch(actions.set_DATA_CHART_SUB(dataChart));
        store.dispatch(actions.set_CATEGORY_CHART_SUB(CategoryChart));
        
    });

}
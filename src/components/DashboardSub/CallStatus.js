import React from 'react';
import './StyleDashboardSub.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class StatusSub extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
    }

    render() {
        let InboundCallsNumber = 0;
        let HandleCallsNumber = 0;
        //let CallWaitingNumber = 0;
        if(this.props.dashboardsubItem != undefined)
        {
            InboundCallsNumber = this.props.dashboardsubItem.InboundCall;
            HandleCallsNumber = this.props.dashboardsubItem.HandleCall
           // CallWaitingNumber = this.props.dashsubItem.InboundAvailble
        }
        return (
            <div className="col-md-4 container-item-center">
                <div className="row">
                    <div className="col-md-12 box-shadow item-dashboard01">
                        <div className="row item-title02">
                             <span style={{width: "80%"}}> CALL STATUS </span>
                        </div>
                        <div className="row" id="item-percent">
                                <div className="col-md-6"> 
                                    <div className="row">
                                        <span className="numberAgent">{InboundCallsNumber}</span> 
                                    </div>
                                    <div className="row" style={{margin:"revert",paddingTop:15}} >
                                            <img style={{ width: 20, height: "auto"}} src="/img/dash_InboundCall.svg" />  
                                            &nbsp;&nbsp; Inbound Calls
                                    </div>
                                </div> 
                                <div className="col-md-6"> 
                                    <div className="row">
                                         <span className="numberAgent">{HandleCallsNumber}</span> 
                                    </div>
                                    <div className="row" style={{margin:"revert",paddingTop:15}}>
                                        <img style={{  width: 20, height: "auto" }} src="/img/dash_AbandonedCall.svg" />  
                                        &nbsp;&nbsp; Handle Calls
                                    </div>
                                </div>
                                {/* <div className="col-md-4"> 
                                    <div className="row" >
                                        <span className="numberAgent">98</span> 
                                    </div>
                                    <div className="row" style={{margin:"revert", paddingTop:15}}>
                                        <img style={{  width: 20, height: "auto"}} src="/img/dash_CallsWaiting.svg" />  
                                         &nbsp;&nbsp; Call Waiting
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    dashboardsubItem: state.dashboardsubItem
})

export default connect(mapStateToProps, null)(StatusSub)
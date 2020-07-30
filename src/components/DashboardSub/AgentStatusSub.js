import React from 'react';
import './StyleDashboardSub.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AgentStatusSub extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() { 
        let AgenttalkingNumber = 0;
        let AgentloginNumber = 0;
        let InboundavailableNumber = 0;
        let talkingPercent = 0;
        let loginPercent = 0;
        let InboundavailablePercent = 0;
        if(this.props.dashboardsubItem != undefined)
        {
            AgenttalkingNumber = this.props.dashboardsubItem.AgentTalk;
            AgentloginNumber = this.props.dashboardsubItem.AgentLogin
            InboundavailableNumber = this.props.dashboardsubItem.InboundAvailble

            talkingPercent= this.props.dashboardsubItem.AVGAgentTalk
            loginPercent = this.props.dashboardsubItem.AVGAgentLogin
            InboundavailablePercent = this.props.dashboardsubItem.AVGInboundAvailble
        }
        return (
            <div className="col-md-4 container-item">
                <div className="row">
                    <div className="col-md-12 box-shadow item-dashboard01">
                        <div className="row item-title02">
                             <span style={{width: "80%"}}> AGENT STATUS </span>
                        </div>
                        <div className="row" id="item-percent">
                                <div className="col-md-4"> 
                                   <span className="numberAgent">{AgenttalkingNumber}</span> 
                                    <div className="row" >
                                             <img style={{ width: 40, height: 40,paddingLeft: 10}} src="/img/dash_SumAgentTalking.svg" />  
                                             <span style={{ paddingTop: 10, paddingLeft: 5}} >Agent talking</span>
                                    </div>
                                    <div className="row" style={{ paddingLeft: 10, paddingRight: 30}}>
                                        <div className="progress width100" id="item-barprogress">
                                            <div className="progress-bar bg-gradient-danger width0" role="progressbar" 
                                                style={{width: talkingPercent + "%"}} 
                                                aria-valuenow={AgenttalkingNumber} aria-valuemin="0" aria-valuemax="100">    
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="col-md-4"> 
                                    <span className="numberAgent"> {AgentloginNumber}</span> 
                                    <div className="row" >
                                            <img style={{ width: 40, height: 36,paddingLeft: 10}} src="/img/dash_AgentLogin.svg" /> 
                                            <span style={{ paddingTop: 10, paddingLeft: 5}} >Agent login</span> 
                                            
                                    </div>
                                    <div className="row" style={{ paddingLeft: 10, paddingRight: 20, marginTop: 4 }}>
                                        <div className="progress width100" id="item-barprogress">
                                            <div className="progress-bar bg-gradient-danger width0" role="progressbar" 
                                                style={{width:  loginPercent + "%"}} 
                                                aria-valuenow={AgentloginNumber} aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4"> 
                                    <span className="numberAgent">{InboundavailableNumber}</span> 
                                    <div className="row" >
                                            <img style={{ width: 40, height: 36,paddingLeft: 10}} src="/img/dash_AgentLogin.svg" />
                                            <span style={{ paddingTop: 10, paddingLeft: 5}} >Inbound available</span>   
                                    </div>
                                    <div className="row" style={{ paddingLeft: 10, paddingRight: 20, marginTop: 4 }}>
                                        <div className="progress width100" id="item-barprogress">
                                            <div className="progress-bar bg-gradient-danger width0" role="progressbar" 
                                                    style={{width: InboundavailablePercent + "%"}} 
                                                    aria-valuenow={InboundavailableNumber} aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, null)(AgentStatusSub)
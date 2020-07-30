import React from 'react';
import './StyleDashboardSub.css';
import { connect } from 'react-redux';
import * as common from '../../utils/common';
import * as actions from '../../actions';
import Content from '../ScreenPop/Content';

class TalkTimer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let AvgWaitTime = "00:00:00";
        let LongestTalkTime = "00:00:00";
        let AvgTalkTime  = "00:00:00";
        if(this.props.dashboardsubItem != undefined)
        {
            AvgTalkTime = this.props.dashboardsubItem.AvgTalkTime;
            AvgWaitTime = this.props.dashboardsubItem.AvgWaitTime
            LongestTalkTime = this.props.dashboardsubItem.LongestTalk
        }
        return (
            <div className="col-md-4 container-item-TalkTimer">
                <div className="row">
                    <div className="col-md-12 box-shadow item-dashboardTalkTimer">
                            <div className="row">
                                    <div className="col-md-6">
                                        <div style={{padding: 15}}>
                                            <span> Longest Talk Time </span> 
                                        </div>    
                                        <div>      
                                            <span className="numberAgent">{LongestTalkTime}</span> 
                                        </div> 
                                    </div> 
                                    <div className="col-md-6"> 
                                          <div style={{padding: 15}}>
                                              <span> Avg Talk Time </span>
                                          </div>
                                          <div>
                                            <span className="numberAgent">{AvgTalkTime}</span> 
                                          </div>
                                    </div>
                            </div> 
                            <div className="row">
                                    <div className="col-md-6"> 
                                          <div style={{padding: 15}}>
                                              <span> Avg Wait Time </span>
                                          </div>
                                          <div>
                                            <span className="numberAgent">{AvgWaitTime}</span> 
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


export default connect(mapStateToProps, null)(TalkTimer)
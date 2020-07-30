import React from 'react';
import { connect } from 'react-redux';
import './StyleDashboardSub.css';
import CallStatus from './CallStatus';
import AgentStatusSub from './AgentStatusSub'
import Abandoned from './Abandoned'
import ReportCallTable from './ReportCallTable'
import ChartSub from './ChartSub'
import TalkTimer from './TalkTimer'

class DashboardSup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }   

    componentDidMount() {
        console.log("DashboardSup");
    }

    render() {
        return (
            <div className='dashboard-container'>
                <div className="row" style={{fontSize:'10px',marginBottom:'-30px'}}>
                    <AgentStatusSub></AgentStatusSub>
                    <CallStatus></CallStatus>
                    <Abandoned></Abandoned>
                </div>
                <div className="row" style={{fontSize:'10px'}}>
                    <ChartSub></ChartSub>
                    <TalkTimer></TalkTimer>
                </div>
                <div className="row" style={{fontSize:'10px', marginTop:'-30px'}}>
                    <ReportCallTable></ReportCallTable>
                </div>
            </div>
        );
    }
}
export default connect(null, null)(DashboardSup)
import React from 'react';
import './styledashboard.css';
import { connect } from 'react-redux';
import CallCapacityChart from './CallCapacityChart'
import Summary from './Summary'
import CallStateChart from './CallStateChart'
import HistoryLog from './HistoryLog'

class DashboardAgent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='dashboard-container'>
                <div className="row">
                    <CallCapacityChart></CallCapacityChart>
                    <Summary></Summary>
                </div>
                <div className="row">
                    <CallStateChart></CallStateChart>
                    <HistoryLog></HistoryLog>
                </div>
            </div>
        );
    }
}
export default connect(null, null)(DashboardAgent)
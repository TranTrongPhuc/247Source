import React from 'react';
import './StyleDashboardSub.css';
import { connect } from 'react-redux';
import * as common from '../../utils/common';
import * as actions from '../../actions';
import Content from '../ScreenPop/Content';

class ReportCallTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
    let tableReportCalls = "";
    if(this.props.dashboardsubItem.queueinfo!=null && this.props.dashboardsubItem.queueinfo!= undefined)
    {
         tableReportCalls = this.props.dashboardsubItem.queueinfo.map((item, index)=>{
               return <tr key={index}>
                        <td>{item.QueueName}</td>
                        <td>{item.Totalcall}</td>
                        <td>{item.AbandonedCall}</td>
                        <td>{item.HandleCall}</td>
                        <td>{item.AvgTalk}</td>
                        <td>{item.LongDuration}</td>
                        <td>{item.AgentTalking}</td>
                        <td>{item.AgentReady}</td>
                        <td>{item.AgentNotReady}</td>
                        <td>{item.AgentWarp}</td>
                        <td>{item.AgentLogin}</td>
                    </tr>
        });
    }

        return (
            <div className="col-md-12 container-table">
               <div class="card shadow mb-4">
                <div class="card-header TableReportCall">
                    <h6 class="TableReportCall-titlem-0">REPORT CALLS AND STATUS IN QUEUE</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Queue</th>
                                        <th>Total Calls</th>
                                        <th>Abandoned Calls</th>
                                        <th>Handled Cals</th>
                                        <th>Avg Talk Time</th>
                                        <th>Longest Talk Time</th>
                                        <th>Agent Talking</th>
                                        <th>Agent Ready</th>
                                        <th>Agent Not Ready</th>
                                        <th>Agent WrapUp</th>
                                        <th>Agent Login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableReportCalls}
                                </tbody>
                            </table>
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

export default connect(mapStateToProps, null)(ReportCallTable)
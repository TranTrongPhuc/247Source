import React from 'react';
import './styledashboard.css';
import { connect } from 'react-redux';
import * as common from '../../utils/common';
class HistoryLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        let itemstatehistory = this.props.statehistory.slice().reverse().map((item, index) => {
            return <tr className="tr-font-text" key={index}>
                <td className="noborder-table width50">{item.StateName}</td>
                <td className="noborder-table width25">{common.DatetimeToHHMMSS(item.Datetime)}</td>
                <td className="noborder-table width25">{common.SecondsToHHMMSS(item.Duration)}</td>
            </tr>
        });

        return (
            <div className="col-md-4 container-historylog">
                <div id="historylog" className="box-shadow" style={{ minWidth: 310, height: 400, maxWidth: 600, margin: 0 }}>
                    <div className="row">
                        <div className="history-title">HISTORY LOG</div>
                    </div>

                    <table id="tbl-agentstatehistory" className="table table-bordered table-striped">
                        <thead>
                            <tr className="bg th-font-text" style={{ fontSize: 15 }}>
                                <th className="noborder-table width50">Status</th>
                                <th className="noborder-table width25">Start Time</th>
                                <th className="noborder-table width25">Duration</th>
                            </tr>
                        </thead>
                        <tbody id="table-agentstatehistory">
                            {itemstatehistory}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    statehistory: state.statehistory
})

export default connect(mapStateToProps, null)(HistoryLog)
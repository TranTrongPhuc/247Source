import React from 'react';
import './styledashboard.css';
import { connect } from 'react-redux';


class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        
        let totalcall = 0;
        let handlecall = 0;
        let nothandlecall = 0;
        let nothandlerate = 0;

        this.props.callcapacitydata[0].data.map((item, index) => {
            totalcall = totalcall + item;
        })
        this.props.callcapacitydata[1].data.map((item, index) => {
            handlecall = handlecall + item;
        })
        this.props.callcapacitydata[2].data.map((item, index) => {
            nothandlecall = nothandlecall + item;
        })

        nothandlerate = Math.round(nothandlecall / totalcall * 100);

        return (
            <div className="col-md-4 container-item">
                <div className="row">
                    <div className="col-md-5 box-shadow item-dashboard01">
                        <div className="row item-title">TOTAL CALLS</div>
                        <div className="row item-value" id="item-totalcalls">{totalcall}</div>
                    </div>
                    <div className="col-md-5 box-shadow item-dashboard02">
                        <div className="row item-title02"><img style={{ width: 25, height: 25 }} src="/img/in_direct.png" /> &nbsp;&nbsp;Handle Calls</div>
                        <div className="row item-value02" id="item-handlecalls">{handlecall}</div>
                    </div>
                </div>
                <br /><br />
                <div className="row">
                    <div className="col-md-5 box-shadow item-dashboard01">
                        <div className="row item-title">Abandoned Rate</div>
                        <div className="row item-value03" id="item-abandonedrate">{nothandlerate} %</div>
                        <div className="row" style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15 }}>
                            <div className="progress width100" id="item-barprogress">
                                <div className="progress-bar bg-gradient-danger width0" role="progressbar" style={{width: nothandlerate + "%"}} aria-valuenow={nothandlerate} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 box-shadow item-dashboard02">
                        <div className="row item-title02"><img style={{ width: 25, height: 25 }} src="/img/out_failed.png" /> &nbsp;&nbsp;Abandoned Calls</div>
                        <div className="row item-value02" id="item-abandonedcalls">{nothandlecall}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    callcapacitydata: state.callcapacitydata
})

export default connect(mapStateToProps, null)(Summary)
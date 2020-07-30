import React from 'react';
import './styleframecallnow.css';
import { connect } from 'react-redux';
import * as jabbersdk from '../../ciscobase/ciscojabbersdk';
import * as actions from '../../actions'
import TransferCall from '../Modal/TransferCall'

class FrameCallNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openmodal: false
        }
    }

    openModal = () => {
        this.setState({
            openmodal: true
        })
    }

    closeModal = () => {
        this.setState({
            openmodal: false
        })
    }

    onAnswer = () => {
        jabbersdk.answerAudio(this.props.telephonyconv);
    }

    onEndCall = () => {
        jabbersdk.endCall(this.props.telephonyconv);
    }

    onHold_UnHold = () => {
        if (this.props.callcurrent.callstate_text == 'Answer') {
            jabbersdk.hold(this.props.telephonyconv);

            this.props.onSetStatusCall({
                callstate_text: 'Hold',
                classbtnaccept: 'btnanswer_hide',
                btndrop_active: false,
                btnhold_active: true,
                btntransfer_active: true
            });
        }
        else {
            jabbersdk.unhold(this.props.telephonyconv);

            this.props.onSetStatusCall({
                callstate_text: 'Answer',
                classbtnaccept: 'btnanswer_hide',
                btndrop_active: true,
                btnhold_active: true,
                btntransfer_active: true
            });
        }
    }

    render() {

        let buttonanswer = this.props.callcurrent.classbtnaccept != 'btnanswer_hide' ?
            <a id="btnanswer"
                className="btn btn-success btn-circle-control btn-sm"
                disabled={!this.props.callcurrent.btnaccept_active}
                onClick={this.onAnswer}
            >
                <img src="/img/call_answer.gif" style={{ width: 37 }} />
            </a> : null;

        return (
            <div style={{ minWidth: 600 }}>
                <div className={'row ' + this.props.callcurrent.classframecall} id="infor-control-callnow"
                    style={{ marginLeft: 10, marginTop: 20 }}
                >
                    <div className="button-control-call" style={{ marginLeft: 20 }}>
                        {buttonanswer}
                        <button id="btndropcall"
                            disabled={!this.props.callcurrent.btndrop_active}
                            className="btn btn-danger btn-circle-control btn-sm"
                            onClick={this.onEndCall}
                        >
                            <img
                                src={this.props.callcurrent.btndrop_active ? '/img/call_hangup.gif' : '/img/call_hangup_disable.png'}
                                style={{ width: 37 }}
                            />
                        </button>
                        <button id="btnholdcall"
                            disabled={!this.props.callcurrent.btnhold_active}
                            className="btn btn-primary bg-white btn-circle-control btn-sm"
                            onClick={this.onHold_UnHold}
                        >
                            <img
                                src={this.props.callcurrent.btnhold_active ? '/img/call_hold.gif' : '/img/call_hold_disable.png'}
                                style={{ width: 37 }}
                            />
                        </button>
                        <button id="btntransfer"
                            disabled={!this.props.callcurrent.btntransfer_active}
                            className="btn btn-primary bg-white btn-circle-control btn-sm"
                            onClick={this.openModal}
                        >
                            <img
                                src={this.props.callcurrent.btntransfer_active ? '/img/call_transfer.gif' : '/img/call_transfer_disable.png'}
                                style={{ width: 37 }}
                            />
                        </button>
                    </div>
                    <div className="infor-call" style={{ width: 400, marginTop: 5 }}>
                        <p id="display_callnumber" style={{ float: 'left', marginRight: 20 }}>
                            {this.props.callcurrent.calldirection + '... ' + this.props.callcurrent.phone}
                        </p>
                        <p id="display_result" style={{ float: 'left', marginRight: 20 }}>
                            {this.props.callcurrent.callstate_text}
                        </p>
                        <p id="display_time">
                            {this.props.callcurrent.counttime}
                        </p>
                    </div>
                </div>
                <TransferCall open={this.state.openmodal} closemodal={this.closeModal}></TransferCall>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    callcurrent: state.callcurrent,
    telephonyconv: state.telephonyconv
})

const mapDispatchToProps = (dispatch) => ({
    onSetStatusCall: (statuscall) => {
        dispatch(actions.setStatusCall(statuscall));
    },
    onEndCall_FixError: () => {
        dispatch(actions.endCallFinish());
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FrameCallNow)
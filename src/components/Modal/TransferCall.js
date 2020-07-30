
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as jabbersdk from '../../ciscobase/ciscojabbersdk';
import * as apicaller from '../../utils/apicaller'

class TransferCall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extention: '',
            btnaccept_enable: false,
            btncomplete_enable: true,
            listextention: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        apicaller.CallApiAuth(`extention?companyuid=${this.props.user.companyuid}`, "GET", null)
            .then(res => {
                this.setState({
                    listextention: res.data
                })
            })
    }

    handleChange(selectedOptions) {
        if (selectedOptions[0] !== undefined) {
            this.setState({
                extention: selectedOptions[0].ExtentionID
            })
        }
    }

    onAcceptTransfer = () => {
        try {
            jabbersdk.transferConversation(this.state.extention, this.props.telephonyconv);
            this.setState({
                btnaccept_enable: true,
                btncomplete_enable: false
            })

            //jabbersdk.transferConversation(this.state.extention, this.props.telephonyconv);
            // this.intervalCompleteTransfercall = setInterval(() => {
            //     jabbersdk.completeTransfer(this.props.telephonyconv);
            //     this.props.closemodal();
            //     clearInterval(this.intervalCompleteTransfercall);
            // }, 1000)
        }
        catch{
            alert("Not exist call now.")
        }
    }

    onComplelteTransfer = () => {
        try {
            this.intervalCompleteTransfercall = setInterval(() => {
                jabbersdk.completeTransfer(this.props.telephonyconv);
                this.onCloseModal();
                clearInterval(this.intervalCompleteTransfercall);
            }, 1000)
        }
        catch{
            alert("Not exist call now.")
        }
    }

    onCloseModal = () => {
        this.setState({
            extention: '',
            btnaccept_enable: false,
            btncomplete_enable: true
        })

        this.props.closemodal();
    }

    render() {
        const { open, closemodal } = this.props;

        return (
            <Modal show={open} onHide={this.props.closemodal}>
                <Modal.Header closeButton>
                    <Modal.Title>Transfer Call</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Extention</Form.Label>
                            <Typeahead
                                id='extention'
                                labelKey={option => `${option.ExtentionID} ${option.ExtentionName}`}
                                options={this.state.listextention}
                                placeholder="Input extention?"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={this.state.btnaccept_enable} onClick={this.onAcceptTransfer}>
                        Accept
                    </Button>
                    <Button variant="primary" disabled={this.state.btncomplete_enable} onClick={this.onComplelteTransfer}>
                        Complete Transfer
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    telephonyconv: state.telephonyconv,
    user: state.user
})

const mapDispatchToProps = (dispatch, props) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(TransferCall)
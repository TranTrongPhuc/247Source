
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as jabbersdk from '../../ciscobase/ciscojabbersdk';
import * as apicaller from '../../utils/apicaller'

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpassword: '',
            newpassword: '',
            confirmnewpassword: ''
        }
    }

    onacceptChangePassword = () => {
        console.log(123123);
        let strError = ''
        if (this.state.oldpassword === '') {
            strError += '- Chưa nhập mật khẩu cũ. \n';
        }
        if (this.state.newpassword === '') {
            strError += '- Chưa nhập mật khẩu mới. \n';
        }
        if (this.state.confirmnewpassword === '') {
            strError += '- Chưa nhập lại mật khẩu mới. \n';
        }
        if (this.state.confirmnewpassword !== '' && this.state.newpassword !== this.state.confirmnewpassword) {
            strError += '- Nhập lại mật khẩu mới chưa đúng.';
        }

        if (strError === '') {
            apicaller.CallApiAuth(`user?username=${this.props.user.username}&oldpassword=${this.state.oldpassword}&newpassword=${this.state.newpassword}`,
                "POST", null)
                .then(res => {
                    if (res.data.success) {
                        alert(res.data.message);
                        this.props.closemodal();
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    alert(err);
                })
        } else {
            alert(strError);
        }
    }

    onChangeInfo = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { open, closemodal } = this.props;
        return (
            <Modal show={open} onHide={this.props.closemodal}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Old password</Form.Label>
                            <Form.Control type="password" name='oldpassword' onChange={this.onChangeInfo} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>New password</Form.Label>
                            <Form.Control type="password" name='newpassword' onChange={this.onChangeInfo} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control type="password" name='confirmnewpassword' onChange={this.onChangeInfo} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closemodal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onacceptChangePassword}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch, props) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
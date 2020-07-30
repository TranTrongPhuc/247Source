import React from 'react';
import './stylelogin.css';
import * as apicaller from '../../utils/apicaller';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            extention: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
            apicaller.CallApiAuth('token', 'POST', null)
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        this.props.history.push("/home");
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    onChangeUser = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.CheckLogin();
        }
    }

    CheckLogin = () => {
        apicaller.CallApi(`token?username=${this.state.username}&password=${this.state.password}&extention=${this.state.extention}`, 'GET', null)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('username', this.state.username);
                    localStorage.setItem('extention', this.state.extention);
                    localStorage.setItem('isAuthenticated', 'true');
                    this.props.history.push("/home");
                }
                else {
                    alert(res.data.error);
                }
            }).catch(err => {
                alert(err);
            });
    }

    render() {
        return (
            <div className="container-scroller" id="bg-login">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row w-100">
                            <div className="col-lg-2 mx-auto">
                                <div className="auth-form-light text-left p-5 auth-form">
                                    <div className="brand-logo">
                                        <img src="/img/slogan.jpg" style={{ width: 200 }} />
                                    </div>
                                    <h4></h4>
                                    <p style={{ fontFamily: 'sans-serif', color: 'red', marginBottom: '15' }} id="error"></p>
                                    <form id="frmLogin" name="frmLogin" onSubmit={this.CheckLogin}>
                                        <div className="form-group">
                                            <input className="form-control input01" type="text" name="username"
                                                onChange={this.onChangeUser} placeholder="Username"
                                                onKeyPress={this.keyPressed}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control input01" type="password" name="password"
                                                onChange={this.onChangeUser} placeholder="Password"
                                                onKeyPress={this.keyPressed}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control input01" type="text" name="extention"
                                                onChange={this.onChangeUser} placeholder="Extention" 
                                                onKeyPress={this.keyPressed}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-success" type="button" id="btnLogin"
                                                onClick={this.CheckLogin}
                                            >LOGIN
                                            </button>
                                        </div>
                                    </form>
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
    user: state.user
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetUserName: (user) => {
            dispatch(actions.setUserName(user));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as apicaller from '../../utils/apicaller';
import * as config from '../../constants/config'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ChangePassword from '../Modal/ChangePassword'

class MenuConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showlist: '',
            openmodal_changepass: false,
            openmodal_profile: false,
            openmodal_setting: false
        }
    }

    showListSelect = () => {
        this.setState({
            showlist: this.state.showlist === '' ? 'show' : ''
        })
    }

    onLogout = () => {
        this.showListSelect();

        confirmAlert({
            title: 'Confirm logout',
            message: 'Are you sure logout ?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmLogout()
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    confirmLogout = () =>{
        apicaller.CallApiAuth(`token?islogout=true?username=${this.props.user.username}&extention=${this.props.user.extention}&deparmentuid=${this.props.user.deparmentuid}&companyuid=${this.props.user.companyuid}`,
        'POST', null)
        .then(res => {
            if (res.data.success) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('extention');
                localStorage.removeItem('isAuthenticated');
                window.location = '/login'
            }
            else {
                alert(res.data.error);
            }
        }).catch(err => {
            alert(err);
        });
    }

    closeModal = () => {
        this.setState({
            openmodal_changepass: false,
            openmodal_profile: false,
            openmodal_setting: false
        })
    }

    openModal_ChangePass = () => {
        this.setState({
            openmodal_changepass: true
        })

        this.showListSelect();
    }

    openModal_Profile = () => {
        this.setState({
            openmodal_profile: true
        })

        this.showListSelect();
    }

    openModal_Setting = () => {
        this.setState({
            openmodal_setting: true
        })

        this.showListSelect();
    }

    render() {
        return (
            <div>
                <li className={'nav-item dropdown no-arrow ' + this.state.showlist}>
                    <a className="nav-link dropdown-toggle"
                        onClick={this.showListSelect}
                        id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    >
                        <img className="img-profile rounded-circle" src="/img/Profile.svg" />
                        <span id="displayname" className="mr-2 d-none d-lg-inline text-gray-600 small"
                            style={{ marginLeft: 10 }}
                        >
                            {this.props.user.displayname + ' - ' + this.props.user.extention}
                        </span>
                    </a>
                    <div className={'dropdown-menu dropdown-menu-right shadow animated--grow-in ' + this.state.showlist}
                        aria-labelledby="userDropdown"
                    >
                        <a className="dropdown-item" id="profile" onClick={this.openModal_Profile}>
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
                    </a>
                        <a className="dropdown-item" id="changepassword" onClick={this.openModal_ChangePass}>
                            <i className="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i> Change Password
                    </a>
                        <a className="dropdown-item" id="setting" onClick={this.openModal_Setting}>
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Settings
                    </a>
                        <a className="dropdown-item">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> Activity Log
                    </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={this.onLogout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
                    </a>
                    </div>
                </li>
                <ChangePassword open={this.state.openmodal_changepass} closemodal={this.closeModal}></ChangePassword>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(MenuConfig)
import React from 'react'
import './stylemenuheader.css'
import './stylelayout.css'
import { Beforeunload } from 'react-beforeunload';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import * as apicaller from '../../utils/apicaller'
import * as config from '../../constants/config'
import Header from '../Header/Header'
import ScreenWork from '../ScreenWork/ScreenWork'
import ScreenWorkDisplay from '../ScreenWork/ScreenWorkDisplay'
import DialPad from '../DialPad/DialPad'
import ConnectCUCM from './ConnectCUCM'
import * as Signalr from './Signalr'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            introconnect: true
        }
    }

    async componentDidMount() {
        //await this.initUserInfor();

        await apicaller.CallApiAuth(`user?username=${localStorage.getItem("username")}&extention=${localStorage.getItem("extention")}`, 'GET', null)
            .then(res => {
                this.props.onSetUser(res.data);
            })
            .catch(err => {
                alert(err + "\n Please login again. Because token expire or error system.")
                this.onLogoutError();
            })
            
        await apicaller.CallApiAuth(`config?companyuid=${this.props.state.user.companyuid}`, 'GET', null)
            .then(res => {
                this.props.onSetConfigCompany(res.data);
            })
            .catch(err => {
                alert(err + "\n Please login again.")
                this.onLogoutError();
            })

        await Signalr.ReceiveEventServer();
        await Signalr.InitSignalr();

        const script = document.createElement('script');
        script.src = "ciscobase/cwic-debug.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = function () {
            window.cwic.SystemController.setLoggingLevel(0);
            window.cwic.SystemController.addEventHandler('onInitializationError', this.onLogoutError);
            window.cwic.SystemController.addEventHandler('onAddonConnectionLost', this.onLogoutError);
            window.cwic.SystemController.initialize();
        }

        apicaller.CallApiAuth('state', 'GET', null)
            .then(res => {
                this.props.onSetListState(res.data);
            })

        this.intervalLoginJabberSDK = setInterval(() => {
            this.ConnectJaberSDK_CUCM();
            clearInterval(this.intervalLoginJabberSDK);
        }, 3000)

        this.intervalHideIntroConnectCUCM = setInterval(() => {
            this.setState({
                introconnect: false
            })
            clearInterval(this.intervalHideIntroConnectCUCM);
        }, 13000)

    };

    async ConnectJaberSDK_CUCM() {
        await this.initJabberSDK();
        await this.registerJabberSDK();
    }

    onLogoutError = () => {
        apicaller.CallApiAuth(`token?islogout=true?username=${this.props.state.user.username}
                               &extention=${this.props.state.user.extention}&deparmentuid=${this.props.state.user.deparmentuid}
                               &companyuid=${this.props.state.user.companyuid}`, 'POST', null)
            .then(res => {
                if (res.data.success) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('extention');
                    localStorage.removeItem('isAuthenticated');

                    alert("Please login again or contact the administrator. Because the CUCM connection was not successful.")
                    window.location = '/login';
                }
                else {
                    alert(res.data.error);
                    alert("Please login again or contact the administrator. Because the CUCM connection was not successful.")
                    window.location = '/login';
                }
            }).catch(err => {
                alert(err);
                alert("Please login again or contact the administrator. Because the CUCM connection was not successful.")
                window.location = '/login';
            });
    }

    //#region comment
    // initUserInfor = () => {
    //     apicaller.CallApiAuth(`user?username=${localStorage.getItem("username")}&extention=${localStorage.getItem("extention")}`, 'GET', null)
    //         .then(res => {
    //             this.props.onSetUser(res.data);
    //             this.initConfigCompany();
    //         })
    //         .catch(err => {
    //             alert(err + "\n Please login again. Because token expire or error system.")
    //             this.onLogoutError();
    //         })
    // }

    // initConfigCompany = () => {

    //     apicaller.CallApiAuth(`config?companyuid=${this.props.state.user.companyuid}`, 'GET', null)
    //         .then(res => {
    //             this.props.onSetConfigCompany(res.data);
    //         })
    //         .catch(err => {
    //             alert(err + "\n Please login again.")
    //             this.onLogoutError();
    //         })
    // }
    //#endregion

    initJabberSDK = () => {
        window.cwic.TelephonyController.addEventHandler('onTelephonyDeviceListChanged', this.onTelephonyDeviceListChanged);
        window.cwic.TelephonyController.addEventHandler('onConnectionStateChanged', this.onConnectionStateChanged);
        window.cwic.TelephonyController.addEventHandler('onConversationOutgoing', this.onConversationStarted);
        window.cwic.TelephonyController.addEventHandler('onConversationIncoming', this.onConversationStarted);
        window.cwic.TelephonyController.addEventHandler('onConversationStarted', this.onConversationStarted);
        window.cwic.TelephonyController.addEventHandler('onConversationEnded', this.onConversationEnded);
        window.cwic.TelephonyController.addEventHandler('onConnectionFailure', this.onLogoutError);
    }

    registerJabberSDK = () => {
        if (this.props.state.configcompany[0].C247M_CUCM_ConnectType === 'VPN') {
            var cucm = this.props.state.configcompany[0].C247M_CUCM_ConnectIP;
            // var cucm = config.UrlCUCM;
            var serverList = [];
            serverList.push(cucm);
            window.cwic.LoginController.setCTIServers(serverList);
            window.cwic.LoginController.setTFTPServers(serverList);
            window.cwic.LoginController.setCUCMServers(serverList);
            window.cwic.LoginController.signIn();

            this.intervalLoginJabberSDK = setInterval(() => {
                window.cwic.LoginController.setCredentials(this.props.state.user.acountcucm, this.props.state.user.passwordcucm);
                window.cwic.LoginController.signIn();

                this.props.onStartLoopStateWrapUp();

                clearInterval(this.intervalLoginJabberSDK);
            }, 3000)
        }
        else
            if (this.props.state.configcompany[0].C247M_CUCM_ConnectType === 'DISCOVERY') {
                window.cwic.LoginController.setEmail(this.props.state.user.acountdiscoverycucm);
                this.intervalLoginJabberSDK02 = setInterval(() => {
                    window.cwic.LoginController.setCredentials(this.props.state.user.acountcucm, this.props.state.user.passwordcucm);
                    this.intervalLoginJabberSDK022 = setInterval(() => {
                        window.cwic.LoginController.signIn();
                        clearInterval(this.intervalLoginJabberSDK022);
                    }, 5000)
                    this.props.onStartLoopStateWrapUp();
                    clearInterval(this.intervalLoginJabberSDK02);
                }, 5000)
            }
    }

    onTelephonyDeviceListChanged = () => {
        var telephonyDevices = window.cwic.TelephonyController.telephonyDevices;
        var telephonyDevice = telephonyDevices[0];
        // var isForceRegistration = true;
        var isForceRegistration = this.props.state.configcompany[0].C247M_StateAfterLogin === '0' ? false : true;
        telephonyDevice.connect(isForceRegistration);
        this.props.onSetTelephonyDevice(telephonyDevice);
    }

    onConnectionStateChanged = (state) => {
        if (state === "Connected") {
            window.cwic.TelephonyController.refreshTelephonyDeviceList();
        }
    }

    onConversationStarted = (telephonyConversation) => {
        switch (telephonyConversation.callState) {
            case 'OffHook': {
                if (this.props.state.callcurrent.phone === '') {
                    var callinfor = {
                        id: telephonyConversation.ID,
                        calldirection: 'Outbound call',
                        phone: telephonyConversation.participants[0].number,
                        extention: this.props.state.user.extention,
                        callstate: telephonyConversation.callState,
                        callstate_text: '',
                        classbtnaccept: 'btnanswer_hide',
                        btnaccept_active: false,
                        btndrop_active: true,
                        btnhold_active: false,
                        btntransfer_active: false
                    }

                    this.props.onAddNewCall(callinfor);
                    this.props.onSetTelephonyConv(telephonyConversation);
                    this.setPopUpCall('Dialing', telephonyConversation.participants[0].number);
                }
                else {
                    // telephony when transfer call
                    this.props.onSetTelephonyConv(telephonyConversation);
                }
                break;
            }
            case 'Ringin': {
                var callinfor = {
                    id: telephonyConversation.ID,
                    calldirection: 'Inbound call',
                    phone: telephonyConversation.participants[0].number,
                    extention: this.props.state.user.extention,
                    callstate: telephonyConversation.callState,
                    callstate_text: '',
                    classbtnaccept: 'btnanswer_show',
                    btnaccept_active: true,
                    btndrop_active: false,
                    btnhold_active: false,
                    btntransfer_active: false
                }

                this.props.onAddNewCall(callinfor);
                this.props.onSetTelephonyConv(telephonyConversation);
                this.setPopUpCall('Incomming', telephonyConversation.participants[0].number);
                break;
            }
            case 'Connected': {

                var statuscall = {
                    id: telephonyConversation.ID,
                    calldirection: 'Outbound call',
                    phone: telephonyConversation.participants[0].number,
                    extention: this.props.state.user.extention,
                    callstate: telephonyConversation.callState,
                    callstate_text: 'Answer',
                    classbtnaccept: 'btnanswer_hide',
                    btnaccept_active: false,
                    btndrop_active: true,
                    btnhold_active: true,
                    btntransfer_active: true
                }

                this.props.onSetStatusCall(statuscall);
                this.props.onSetTelephonyConv(telephonyConversation);
                clearInterval(this.IntervalCounttime);
                this.intervalCounttime();
                break;
            }
            default:
        }
    }

    onConversationEnded = (telephonyConversation) => {
        if (this.props.state.callcurrent.calldirection === '')
            return;

        this.props.onEndCall();
        this.props.onClearTelephonyConv();
        clearInterval(this.IntervalCounttime);
    }

    onConversationUpdate = (telephonyConversation) => {

    }

    setPopUpCall = (directcall, phonenumber) => {
        this.props.state.screenpoplist.map((popup) => {
            var popup = {
                id: phonenumber + '_' + Math.random(),
                ScreenUID: popup.ScreenUID,
                headertab: directcall,
                phone: phonenumber,
                screenpopurl: popup.ScreenPopURL + phonenumber,
                active: true
            }
            this.props.onSetPopUp(popup);
        })
    }

    intervalCounttime = () => {
        this.IntervalCounttime = setInterval(() => {
            var hms = this.props.state.callcurrent.counttime !== '' ? this.props.state.callcurrent.counttime : '00:00:00';
            var a = hms.split(':');
            var seconds = (+a[0]) * 3600 + (+a[1]) * 60 + (+a[2]);
            seconds = seconds + 1;
            var date = new Date(null);
            date.setSeconds(seconds);
            var nextcounttime = date.toISOString().substr(11, 8);
            this.props.onCounTime(nextcounttime);
        }, 1000)
    }

    render() {
        if (this.props.state.user.username === '')
            return null;

        if (this.state.introconnect)
            return <ConnectCUCM></ConnectCUCM>

        return (
            <div>
                <div id="menu_header">
                    <Header></Header>
                </div>
                <div id="wrapper">
                    <div id="menu_screen">
                        <ScreenWork></ScreenWork>
                    </div>
                </div>
                <div id="content-wrapper" className="d-flex flex-column">
                    <ScreenWorkDisplay></ScreenWorkDisplay>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
                <DialPad></DialPad>
                {/* <Beforeunload onBeforeunload={event => event.preventDefault()} /> */}
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddNewCall: (callinfor) => {
            dispatch(actions.setDeliveryCall(callinfor));
        },
        onSetStatusCall: (statuscall) => {
            dispatch(actions.setStatusCall(statuscall));
        },
        onEndCall: () => {
            dispatch(actions.endCall());
        },
        onCounTime: (counttime) => {
            dispatch(actions.countTime(counttime));
        },
        onSetTelephonyConv: (telephonyconv) => {
            dispatch(actions.setTelephonyConv(telephonyconv));
        },
        onClearTelephonyConv: () => {
            dispatch(actions.clearTelephonyConv());
        },
        onSetTelephonyDevice: (telephonydevice) => {
            dispatch(actions.setTelephonyDevice(telephonydevice));
        },
        onClearTelephonyDevice: () => {
            dispatch(actions.clearTelephonyDevice());
        },
        onSetListState: (liststate) => {
            dispatch(actions.setListState(liststate))
        },
        onSetUser: (user) => {
            dispatch(actions.setUser(user))
        },
        onSetConfigCompany: (configcompany) => {
            dispatch(actions.setConfigConpany(configcompany))
        },
        onSetPopUp: (popup) => {
            dispatch(actions.SetPopUp(popup));
        },
        onSetStateSavePre: (statesavepre) => {
            dispatch(actions.setStatePre(statesavepre));
        },
        onSetStateCurrent: (statecurrent) => {
            dispatch(actions.setStateCurrent(statecurrent));
        },
        onStartLoopStateWrapUp: () => {
            dispatch(actions.startLoopStateWrapUp());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
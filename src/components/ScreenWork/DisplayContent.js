import React from 'react';
import './stylescreenwork.css';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import * as config from '../../constants/config';
import * as apicaller from '../../utils/apicaller';
import ScreenPop01 from '../ScreenPop/ScreenPop01';
import DashboardAgent from '../DashboardAgent/DashboardAgent';
import DashboardSub from '../DashboardSub/DashboardSup';

class DisplayContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if (this.props.screen.Is_AuthenticByUserConnect247) {
            // console.log('authentic gadget' + this.props.screen.Is_AuthenticByUserConnect247 + this.props.screen.ScreenHeader);
            // // var AuthenticURL = this.props.screen.AuthenticURL.replace('@USERNAME', this.props.user.username).replace('@PASSWORD', this.props.user.password);
             var AuthenticURL = this.props.screen.AuthenticURL.replace('@USERNAME', this.props.user.username).replace('@PASSWORD', '123456');
            apicaller.CallApiExternal(AuthenticURL, 'GET', '')
                .then(res => {
                    console.log(res.data);
            })
        }
    }

    render() {
        let content = ''
        if (this.props.screen.IsUseView) {
            switch (this.props.screen.ViewName) {
                case 'ScreenPop01':
                    content = <ScreenPop01 screen={this.props.screen}></ScreenPop01>
                   // content = <DashboardSub></DashboardSub>
                    break;
                case 'DashboardAgent':
                    content = <DashboardAgent></DashboardAgent>
                    break;
                case 'DashboardSub':
                    content = <DashboardSub></DashboardSub>
                    break;
                case 'CallHistoryAgent':
                    content = <iframe className='display-frame'
                        src={config.UrlServerGadget + '/Gadget/GadgetHistorycall?token=' + localStorage.getItem('token')}
                    >
                    </iframe >
                    break;
                case 'ReportVoice':
                    content = <iframe className='display-frame'
                        src={config.UrlServerGadget + '/ReportVoiceLayout/Index?token=' + localStorage.getItem('token')}
                    >
                    </iframe >
                    break;
                case 'ad_tabscreenpop03.html':
                    content = <ScreenPop01 ScreenPopURL={this.props.screen.ScreenPopURL}></ScreenPop01>
                    break;
                default:
            }
        }
        else
            if (this.props.screen.IsUseServerURL) {
                content = <iframe className='display-frame' src={config.UrlServerGadget + this.props.screen.ScreenURL}></iframe >
            } else {
                content = <iframe className='display-frame' src={this.props.screen.ScreenURL}></iframe >
            }
        return (
            <div>
                <div className={'container-fluid ' + (this.props.screenredux.IsActive == true ? ' screen_show' : 'screen_hide')}
                    id={this.props.screen.ScreenUID}
                >
                    {content}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    screenredux: state.screenwork.find(screen => screen.ScreenUID === ownProps.screen.ScreenUID),
    user: state.user
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onActiveScreen: (screenuid) => {
            dispatch(actions.setActiveScreen(screenuid));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContent)
import React from 'react';
import './stylescreenwork.css'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as apicaller from '../../utils/apicaller';
import MenuIcon from './MenuIcon';

class ScreenWork extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        await this.getListScreenWork();
    };

    getListScreenWork = () => {
        apicaller.CallApiAuth(`screen?username=${this.props.user.username}&issupervisor=${this.props.user.issupervisor}`, 'GET', null)
            .then(res => {
                console.log("username",this.props.user.username,"issupervisor",this.props.user.issupervisor);
                console.log("getListScreenWork",res.data);
                this.props.onSetListScreen(res.data);
            })
    }

    render() {
        let listscreenicon = this.props.listscreen.map((screen, index) => {
            return <MenuIcon screen={screen} key={index}></MenuIcon>
        });

        return (
            <ul className="navbar-nav bg-gradient-primary-custom sidebar sidebar-dark fixed-top toggled"
                id="accordionSidebar"
                style={{ marginTop: 64 }}
            >
                {listscreenicon}
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    listscreen: state.screenwork
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetListScreen: (listscreen) => {
            dispatch(actions.setListScreenWork(listscreen));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenWork)
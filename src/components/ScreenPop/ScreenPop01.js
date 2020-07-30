import React from 'react';
// import '../../css_basebs/screenwork.css'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Content from './Content';

class ScreenPop01 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var popupmanager = {
            ScreenUID: this.props.screen.ScreenUID,
            ScreenName: this.props.screen.ScreenName,
            ScreenHeader: this.props.screen.ScreenHeader,
            ScreenPopURL: this.props.screen.ScreenPopURL,
            ScreenPopHomeURL: this.props.screen.ScreenPopHomeURL,
            ListPopUp: []
        }

        this.props.onInitPopUp(popupmanager);

    }

    closePopUp = (ScreenUID, id) => {
        this.props.onClosePopUp(ScreenUID, id);
    }

    choicePopUp = (ScreenUID, id) => {
        this.props.onChoicePopUp(ScreenUID, id);
    }

    onClickTest = () => {
        var popup = {
            id: '0932600795_' + Math.random(),
            ScreenUID: "69ebfbb1-b4d3-423f-91a9-4c9420840cce",
            headertab: 'Dialing',
            phone: '0932600795',
            screenpopurl: this.props.ScreenPopURL + '0932600795'
        }
        this.props.onSetPopUp(popup);
    }

    render() {
        if (this.props.screenpop == undefined)
            return null;

        let listscreenpop = this.props.screenpop.ListPopUp.map((screen, index) => {
            return <Content screen={screen} key={index}></Content>
        });

        let listheadertab = this.props.screenpop.ListPopUp.map((screen, index) => {
            return <li className="nav-item" key={index}
                onClick={() => this.choicePopUp(screen.ScreenUID, screen.id)}
            >
                <a className={'nav-link navlink_header screenpopphonehearder '
                    + (this.props.screenpop.ListPopUp.find(x => x.id == screen.id).active == true ? 'active' : '')}
                    id={index}
                >
                    {screen.headertab}: {screen.phone}&nbsp;&nbsp;
                    <span className="close" onClick={() => this.closePopUp(screen.ScreenUID, screen.id)}>×</span>
                </a>
            </li>
        });

        return (
            <div>
                <div className="container04">
                    <br />
                    <ul className="nav nav-tabs screenpop_one screenpop_one01" role="tablist" id="headertab_screenpop01">
                        {listheadertab}
                    </ul>
                    <div className="tab-content" id="contenttab_screenpop01">
                        {listscreenpop}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    screenpop: state.screenpoplist.find(screen => screen.ScreenUID === ownProps.screen.ScreenUID)
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onInitPopUp: (popupmanager) => {
            dispatch(actions.initPopUp(popupmanager));
        },
        onSetPopUp: (popup) => {
            dispatch(actions.SetPopUp(popup));
        },
        onClosePopUp: (ScreenUID, id) => {
            dispatch(actions.closePopUp(ScreenUID, id));
        },
        onChoicePopUp: (ScreenUID, id) => {
            dispatch(actions.choicePopUp(ScreenUID, id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenPop01)
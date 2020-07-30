import React from 'react';
import './stylescreenwork.css'
import { connect } from 'react-redux';
import * as actions from '../../actions';

class MenuIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    activeScreen = () => {
        this.props.onActiveScreen(this.props.screen.ScreenUID);
    }

    render() {
        return (
            <div>
                <li className="nav-item" onClick={this.activeScreen}>
                    <a className={'nav-link item-screen' + (this.props.screenredux.IsActive == true ? ' select_screen':'')}
                        id={'icon-' + this.props.screen.ScreenUID}
                        data-id={this.props.screen.ScreenUID}
                    >
                        <img src={this.props.screen.ClassICON} style={{ width: 20 }} />
                        <span> {this.props.screen.ScreenHeader} </span>
                    </a>
                </li>
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
    screenredux: state.screenwork.find(screen => screen.ScreenUID === ownProps.screen.ScreenUID)
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onActiveScreen: (screenuid) => {
            dispatch(actions.setActiveScreen(screenuid));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuIcon)
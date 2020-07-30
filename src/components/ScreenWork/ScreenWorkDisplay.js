import React from 'react';
import './stylescreenwork.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import DisplayContent from './DisplayContent';

class ScreenWorkDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let listscreencontent = this.props.listscreen.map((screen, index) => {
            return <DisplayContent screen={screen} key={index}></DisplayContent>
        });
        
        return (
            <div id="content" style={{marginTop: 64, marginLeft: 72}}>
                {listscreencontent}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    listscreen: state.screenwork
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onActiveScreen: (screenuid) => {
            dispatch(actions.setActiveScreen(screenuid));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenWorkDisplay)
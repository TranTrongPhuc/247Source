import React from 'react';
import './stylescreenpop.css';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="screenpophome01" className={'container03 tab-pane '
                + (this.props.screen.active == true ? 'active' : '')}>
                <iframe className='content-popup' frameBorder="0" src={this.props.screen.screenpopurl}></iframe>
            </div>
        );
    }
}

export default connect(null, null)(Content)
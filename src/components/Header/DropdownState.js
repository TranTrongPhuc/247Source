import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class DropdownState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showlist: ''
        }
    }

    componentDidMount() {
        // default state khi login hoac load lai ung dung
        this.selectState(this.props.configcompany[0].C247M_StateAfterLogin);
    }

    showListSelect = () => {
        this.setState({
            showlist: this.state.showlist === '' ? 'show' : ''
        });
    }

    selectState = (StateID) => {
        var statecurrent = this.props.statelist.find(x => x.StateID === StateID);
        this.props.onSetStateCurrent(statecurrent);
        this.setState({ showlist: '' });
    }

    render() {
        var liststate = this.props.statelist.filter(x => x.IsHide === false).map((stt, index) => {
            let result = ''
            result = <a key={index} className="dropdown-item select_state" data-id={stt.StateID}
                onClick={() => this.selectState(stt.StateID)}
            >
                <img src={'/img/' + stt.Color + '.jpg'} id="img_state_icon" alt="image" className="rounded-circle icon-state" /> {stt.StateName}
                <div className="dropdown-divider"></div>
            </a>

            return result;
        })

        return (
            <li className={'nav-item nav-profile dropdown ' + this.state.showlist} style={{ marginRight: 50 }}>
                <a className="nav-link dropdown-toggle dropdown-state" onClick={this.showListSelect} id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false" style={{ height: 30, marginTop: 19 }}>
                    <div className="nav-profile-img">
                        <img src={'/img/' + this.props.statecurrent.Color + '.jpg'} id="img_state_icon" alt="image" className="rounded-circle icon-state" />
                    </div>
                    <div className="nav-profile-text" style={{ marginTop: 5 }}>
                        <p className="mb-1 text-black" id="displaystate">{this.props.statecurrent.StateName}</p>
                    </div>
                </a>
                <div className={'dropdown-menu navbar-dropdown ' + this.state.showlist} id="droplist_state" aria-labelledby="profileDropdown">
                    {liststate}
                </div>
            </li>
        );
    }
}

const mapStateToProps = (state) => ({
    statelist: state.statelist,
    statecurrent: state.statecurrent,
    configcompany: state.configcompany
})

const mapDispatchToProps = (dispatch, props) => ({
    onSetStateCurrent: (statecurrent) => {
        dispatch(actions.setStateCurrent(statecurrent));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(DropdownState)
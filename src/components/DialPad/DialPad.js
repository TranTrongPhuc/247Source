import React from 'react';
import './styledialpad.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as jabbersdk from '../../ciscobase/ciscojabbersdk'

const RecentSearchList = props => (
    <div className={'area_recentcall dialerpad-container ' + props.dialpad_hide}>
        <div className="list-recent">
            <div>RECENT CALL</div>
            <table className="table">
                <tbody>
                    {
                        props.listRecent.map((item, index) => (
                            <tr key={index} className={props.index === index ? 'item-recent-select' : ''}>
                                <td className='item-recent'>{item}</td>
                                <td><button className='btn btn-success' onClick={() => props.onCall(item)}>Call</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
);

class DialPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialpad_hide: 'dialpad_hide',
            phoneinput: '',
            recentcall: [],
            recentfilter: [],
            index_select: 0
        }

        this.callPhoneRecent02 = this.callPhoneRecent02.bind(this);
    }

    showhideDialpad = () => {
        this.setState({
            dialpad_hide: this.state.dialpad_hide == 'dialpad_hide' ? '' : 'dialpad_hide'
        })
    }

    addNumberChar = (char) => {
        this.setState({
            phoneinput: this.state.phoneinput + char,
            recentfilter: this.state.phoneinput + char !== ''
                ? this.state.recentcall.filter(x => x.includes(this.state.phoneinput + char)) : [],
            index_select: 0
        })
    }

    removeNumberChar = () => {
        this.setState({
            phoneinput: this.state.phoneinput.substring(0, String(this.state.phoneinput).length - 1),
            recentfilter: this.state.phoneinput.substring(0, String(this.state.phoneinput).length - 1) !== ''
                ? this.state.recentcall.filter(x => x.includes(this.state.phoneinput.substring(0, String(this.state.phoneinput).length - 1))) : [],
            index_select: 0
        })
    }

    changeNumber = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });

        this.setState({
            recentfilter: value !== '' ? this.state.recentcall.filter(x => x.includes(value)) : [],
            index_select: 0
        });
    }

    callPhone = () => {
        if (this.state.phoneinput == '') {
            alert('Chưa nhập số điện thoại');
            return;
        }

        jabbersdk.startAudioConversation(this.state.phoneinput);

        if (this.state.recentcall.find(x => x === this.state.phoneinput) === undefined) {
            this.setState({
                recentcall: this.state.recentcall.concat([this.state.phoneinput])
            })
        }

        this.setState({
            dialpad_hide: 'dialpad_hide',
            phoneinput: ''
        })
    }

    callPhoneRecent = (phone) => {
        jabbersdk.startAudioConversation(phone);

        this.setState({
            dialpad_hide: 'dialpad_hide',
            phoneinput: '',
            recentfilter: [],
            index_select: 0
        })
    }

    async callPhoneRecent02() {
        await this.setState({
            phoneinput: this.state.recentfilter[this.state.index_select]
        })
        await this.callPhone();
        await this.setState({
            dialpad_hide: 'dialpad_hide',
            phoneinput: '',
            recentfilter: [],
            index_select: 0
        })
    }

    keyPressed = (event) => {
        if (event.key === "Enter") {

            if (this.state.recentfilter.length === 0) {
                this.callPhone();
            }
            else {
                this.callPhoneRecent02();
            }
        }
    }

    keyDown = (event) => {
        if (event.key === "ArrowUp") {
            this.setState({
                index_select: this.state.index_select !== 0 ? this.state.index_select - 1 : 0
            })
        }
        if (event.key === "ArrowDown") {
            this.setState({
                index_select: this.state.index_select < this.state.recentfilter.length - 1 ? this.state.index_select + 1 : this.state.index_select
            })
        }
    }

    render() {
        let recent = this.state.recentfilter.length !== 0 ?
            <RecentSearchList
                listRecent={this.state.recentfilter}
                dialpad_hide={this.state.dialpad_hide}
                index={this.state.index_select}
                onCall={this.callPhoneRecent}
            ></RecentSearchList>
            : '';

        return (
            <div>
                {recent}
                <div className={'dialpadmodal ' + this.state.dialpad_hide} id="dialpadmodal" aria-hidden="true">
                    <div className="dialerpad-container">
                        <div className="row" style={{ marginBottom: 3 }}>
                            <input type="text" name="phoneinput" className="txtnumbercall"
                                autoComplete="off"
                                value={this.state.phoneinput}
                                onChange={this.changeNumber}
                                onKeyPress={this.keyPressed}
                                onKeyDown={this.keyDown}
                            />
                            <button className="btn btndelete" onClick={this.removeNumberChar}>
                                <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                    <path fill="#000000"
                                        d="M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="dialerpad">
                            <div className="row">
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('1')}>
                                    <div className="keynum">1</div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('2')}>
                                    <div className="keynum">2</div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('3')}>
                                    <div className="keynum">3</div>
                                </button>
                            </div>
                            <div className="row">
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('4')}>
                                    <div className="keynum">4</div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('5')}>
                                    <div className="keynum">5</div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('6')}>
                                    <div className="keynum">6</div>
                                </button>
                            </div>
                            <div className="row">
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('7')}>
                                    <div className="keynum">7</div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('8')}>
                                    <div className="keynum">8</div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('9')}>
                                    <div className="keynum">9</div>
                                </button>
                            </div>
                            <div className="row">
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('*')}>
                                    <div className="keynum">*</div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('0')}>
                                    <div className="keynum">0</div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnnumber" onClick={() => this.addNumberChar('#')}>
                                    <div className="keynum">#</div>
                                </button>
                            </div>
                            <div className="row aligncontent">
                                <button className="btn btn-circle btnnumber-hide" data-num="">
                                    <div className="keynum"></div>
                                </button>
                                <button className="btn btn-outline-facebook btn-circle btnCall" onClick={this.callPhone}>
                                    <i className="mdi mdi-phone btn-outline-success" id="call-button"></i>
                                </button>
                                <button className="btn btn-circle btnnumber-hide" data-num="">
                                    <div className="keynum"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dialpadbutton" id="dialpadbutton" aria-hidden="true">
                    <button className="btn btn-outline-facebook btn-circle btndialpad" onClick={this.showhideDialpad}>
                        <i className="mdi mdi-dialpad btn-outline-success" id="dialpad-button"></i>
                    </button>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state, ownProps) => ({
//     listscreen: state.screenwork
// })

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         onActiveScreen: (screenuid) => {
//             dispatch(actions.setActiveScreen(screenuid));
//         }
//     }
// }

export default connect(null, null)(DialPad)
// export default connect(mapStateToProps, mapDispatchToProps)(DialPad)
import React from 'react';
import './StyleDashboardSub.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Abandoned extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        let abandonedPercent = 0;
        let ratesPercent = 0;
        if(this.props.dashboardsubItem != undefined)
        {
            abandonedPercent = this.props.dashboardsubItem.InboundCall;
            ratesPercent = this.props.dashboardsubItem.HandleCall
        }
        return (
            <div className="col-md-4 container-item-right">
                    <div className="row">
                        <div className="col-md-6 box-shadow item-dashboard01">
                            <div className="row item-title02">
                                <img style={{ width: 25, height: 25, marginRight:'5%' }} src="/img/misscall.png" />  
                                <span style={{width: "80%",fontSize:13}}> Abandoned </span>
                            </div>
                            <div className="row" id="item-percent">
                               <div className="col-md-5 fontPercent"> {abandonedPercent} % </div> 
                               {/* <div className="col-md-6"> 
                                    <div className="progress-v progress-lg progress-vertical">
                                                <div className="progress-bar progress-bar-danger BoderRadiusProgressTop"  style={{height: "33%"}} role="progressbar">
                                                    <span className="sr-only">35% Complete (success)</span>
                                                </div>
                                                <div className="progress-bar progress-bar-warning progress-bar-striped"  style={{height: "33%"}} role="progressbar">
                                                    <span className="sr-only">35% Complete (warning)</span>
                                                </div>
                                                <div className="progress-bar progress-bar-success BoderRadiusProgressBottom" style={{height: "33%"}} role="progressbar">
                                                    <span style={{paddingLeft:"21px"}}>- Great</span>
                                                    <span className="sr-only">35% Complete (danger)</span>
                                                </div>
                                            </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-5 box-shadow item-dashboard01">
                            <div className="row item-title02">
                                <span style={{width: "80%",fontSize:13}}> Rates </span>
                            </div>
                            <div className="row" id="item-percent">
                               <div className="col-md-5 fontPercent"> {ratesPercent} % </div> 
                            </div>
                        </div>
                    </div>                 
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    dashboardsubItem: state.dashboardsubItem
})

export default connect(mapStateToProps, null)(Abandoned)
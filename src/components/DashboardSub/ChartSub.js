import React from 'react';
import './StyleDashboardSub.css';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as actions from '../../actions';

class ChartSub extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <div className="col-md-8 container-item-Char">
                <div className="row">
                    <div className="col-md-12 box-shadow" style={{backgroundColor:"white"}}>
                        <div>
                            <HighchartsReact highcharts={Highcharts} options={
                                {
                                    chart: {
                                        type: 'bar',
                                        height: 200,
                                     },
                                     credits: {
                                        text: '',
                                        href: ''
                                     },
                                     title: {
                                        text: 'Call volume in queue - column chart'
                                     },
                                      xAxis: {
                                        categories: this.props.dashsubcallcategory
                                      },
                                      yAxis: {
                                        min: 0,
                                        title: {
                                          text: ''
                                        }
                                      },
                                      legend: {
                                        reversed: true
                                      },
                                      plotOptions: {
                                        series: {
                                          stacking: 'normal'
                                        }
                                      },
                                      series: this.props.dashsubcallchartdata
                                }
                            } />
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

const mapStateToProps = (state) => ({
    dashsubcallchartdata: state.dashsubcallchartdata,
    dashsubcallcategory: state.dashsubcallcategory
})

export default connect(mapStateToProps, null)(ChartSub)
import React from 'react';
import './styledashboard.css';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class CallStateChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className = "col-md-8 row">
                <div className="col-md-6 container-chartstate">
                    <div id="chartstate" className="box-shadow" style={{minWidth: 310, height: 400, maxWidth: 600, margin: 0}}>
                    <HighchartsReact highcharts={Highcharts} options={
                        {
                            chart: {
                                type: 'pie',
                                renderTo: 'chartstate'
                              },
                              title: {
                                verticalAlign: 'middle',
                                floating: true,
                                text: 'Percent state',
                                style: {
                                    fontSize: '10px',
                                }
                              },
                              plotOptions: {
                                pie: {
                                    dataLabels: {
                                        format: '{point.name}: {point.percentage:.1f} %'
                                    },
                                  innerSize: '70%'
                                }
                              },
                              series: this.props.statepercent
                        }

                    } />
                    </div>
                </div>
                <div className="col-md-6 container-charttotalcall">
                    <div id="charttotalcall" className="box-shadow" style={{minWidth: 310, height: 400, maxWidth: 600, margin: 0}}>
                    <HighchartsReact highcharts={Highcharts} options={
                        {
                            chart: {
                                type: 'pie',
                                renderTo: 'chartstate'
                              },
                              title: {
                                verticalAlign: 'middle',
                                floating: true,
                                text: 'Call state',
                                style: {
                                    fontSize: '10px',
                                }
                              },
                              plotOptions: {
                                pie: {
                                    dataLabels: {
                                        format: '{point.name}: {point.percentage:.1f} %'
                                    },
                                  innerSize: '70%'
                                }
                              },
                              series: this.props.callpercent
                        }
                    } />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    statepercent: state.statepercent,
    callpercent: state.callpercent
})

export default connect(mapStateToProps, null)(CallStateChart)
import React from 'react';
import './styledashboard.css';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as actions from '../../actions';

class CallCapacityChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.initDataDashboard();

        this.intervalCheckCapacityCategory = setInterval(() => {
            var d = new Date();
            if (this.props.callcapacitycategory.slice(-1)[0] !== d.getHours()) {
                this.props.onSetAddCapacityCaregory(d.getHours());
                this.props.setAddLast('');
            }
        }, 3600000)
    }

    render() {
        return (
            <div className="col-md-8 container-chartcapacitycall">
                <div className="box-shadow">
                    <HighchartsReact highcharts={Highcharts} options={
                        {
                            chart: {
                                type: 'line',
                                height: 365,
                            },
                            title: {
                                text: 'Call Volume - Line chart (interval 60 minute/day)'
                            },
                            subtitle: {
                                text: ''
                            },
                            xAxis: {
                                categories: this.props.callcapacitycategory
                            },
                            yAxis: {
                                title: {
                                    text: 'number of calls'
                                }
                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    },
                                    enableMouseTracking: false
                                }
                            },
                            series: this.props.callcapacitydata
                        }
                    } />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    callcapacitydata: state.callcapacitydata,
    callcapacitycategory: state.callcapacitycategory,
})

const mapDispatchToProps = (dispatch, props) => ({
    onSetAddLast: (typepara) => {
        dispatch(actions.setAddLast(typepara));
    },
    onSetIncrementLast: (typepara) => {
        dispatch(actions.setIncrementLast(typepara));
    },
    onSetAddCapacityCaregory: (new_category) => {
        dispatch(actions.setAddCapacityCaregory(new_category));
    },
    setAddLast: (typepara) => {
        dispatch(actions.setAddLast(typepara));
    },
    initDataDashboard: () => {
        dispatch(actions.initDataDashboard());
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(CallCapacityChart)
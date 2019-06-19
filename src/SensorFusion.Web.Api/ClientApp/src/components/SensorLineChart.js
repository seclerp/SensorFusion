import React, {useEffect, useState} from 'react';
import { Line } from "react-chartjs-2";
import DateHelper from "../services/DateHelper";
import connect from "react-redux/es/connect/connect";

function SensorLineChart(props) {
  const { valuesData } = props;
  const timeSents = valuesData.slice().reverse().map(valuesDataItem => DateHelper.format(valuesDataItem.valueSent));
  const values = valuesData.slice().reverse().map(valuesDataItem => parseFloat(valuesDataItem.value));
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    title: {
      display: false,
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: false,
        scaleLabel: {
          display: true,
          labelString: props.locales["timesent"]
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: props.locales["value"]
        }
      }]
    }
  };

  const data = {
    labels: timeSents,
    datasets: [{
      label: props.locales["value"],
      data: values,
      fill: false,
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgb(54, 162, 235)",
    }]
  };
  
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

SensorLineChart.propTypes = {};

const mapStateToProps = state => ({
  locales: state.locales
});

export default connect(mapStateToProps)(SensorLineChart);
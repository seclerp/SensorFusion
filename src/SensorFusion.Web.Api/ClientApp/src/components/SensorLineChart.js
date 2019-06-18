import React, {useEffect, useState} from 'react';
import { Line } from "react-chartjs-2";
import DateHelper from "../services/DateHelper";

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
          labelString: 'Time sent'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  };

  const data = {
    labels: timeSents,
    datasets: [{
      label: 'Value',
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

export default SensorLineChart;
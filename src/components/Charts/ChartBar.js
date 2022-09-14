import "./ChartBar.css";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import React from "react";

const ChartBar = (props) => {
  return (
    <div className="statistic-bar-item">
      <h4>{props.title}</h4>
      <Bar data={props.data} />
    </div>
  );
};

export default ChartBar;

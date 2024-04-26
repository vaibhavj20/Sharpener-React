// Write your code below:
import React from "react";
import Chart from "../Chart/Chart";

const ExpenseChart = (props) => {
  return (
    <div>
      <Chart chartExpenses={props.chartData} />
    </div>
  );
};

export default ExpenseChart;

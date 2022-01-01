import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart(props) {
  let tickers = [];
  let values = [];
  let names = [];

  props.data.forEach((item, i) => {
    tickers.push(item.ticker);
    names.push(item.name);
    values.push(item.precentOfPort);
  });

  return (
    <div>
      <Doughnut
        width="300"
        height="400"
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              formatter: (value, context) => {
                return value < 4 ? "" : `${tickers[context.dataIndex]}\n${value}%`;
              },
            },
          },
        }}
        data={{
          labels: names,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
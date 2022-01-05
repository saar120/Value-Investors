import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart(props) {
  let tickers = [];
  let values = [];
  let names = [];

  props.data.forEach((item) => {
    tickers.push(item.ticker);
    names.push(item.name);
    values.push(item.percentOfPort);
  });

  return (
    <div style={{ height: "clamp(300px,20vw,400px)", width: "clamp(300px,20vw,400px)" }}>
      <Doughnut
        options={{
          onClick: (_, element) => {
            if (element.length !== 1) return;
            props.stockClick(tickers[element[0].index]);
          },
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
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        }}
      />
    </div>
  );
}

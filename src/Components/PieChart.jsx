import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart(props) {
  let tickers = [];
  let values = [];
  let names = [];

  let othersCount = 0;

  props.data.forEach((item) => {
    if (item.percentOfPort < 2) {
      othersCount += item.percentOfPort;
      return;
    }
    tickers.push(item.ticker);
    names.push(item.name);
    values.push(item.percentOfPort);
  });

  if (othersCount > 0) {
    tickers.push("Others");
    values.push(othersCount);
    names.push("Smaller than 1%");
  }

  return (
    <div style={{ height: "clamp(300px,20vw,400px)", width: "clamp(300px,20vw,400px)" }}>
      <Doughnut
        options={{
          onClick: (_, element) => {
            if (element.length !== 1 || tickers[element[0].index] === "Others") return;
            props.stockClick(tickers[element[0].index]);
          },
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              formatter: (value, context) => {
                if (tickers[context.dataIndex] === "Others") {
                  return tickers[context.dataIndex];
                }
                return value < 3 ? "" : `${tickers[context.dataIndex]}\n${value}%`;
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

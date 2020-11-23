import React from "react";
import { Line } from "react-chartjs-2";
import api from "services/axios";
const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

export default function Chart() {
  const [data, setData] = React.useState([]);

  const chartData = {
    type: "line",
    labels: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    datasets: [
      {
        data: [0, 0, 0, 450000, 0, 0, 0, 0, 0, 0, 0],
        label: "Ngày hôm nay",
        borderColor: "blue",
        fill: false,
      },
      {
        data: [0, 0, 0, 0, 1800000, 0, 0, 1200000, 3150000, 0, 0],
        label: "Ngày hôm qua",
        borderColor: "yellow",
        fill: false,
      },
    ],
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/api/order/get-report-for-day`);
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Line
        data={chartData}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

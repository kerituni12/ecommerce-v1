import React from "react";
import { Line } from "react-chartjs-2";
import api from "services/axios";

export default function Chart() {
  const [data, setData] = React.useState([]);

  const chartData = {
    type: "line",
    labels: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    datasets: [
      {
        data: data.arr,
        label: "Ngày hôm nay",
        borderColor: "blue",
        fill: false,
      },
      {
        data: data.arr2,
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
            text: "Báo cáo danh thu",
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

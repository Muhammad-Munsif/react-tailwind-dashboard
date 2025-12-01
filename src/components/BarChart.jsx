import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart() {
  const data = {
    labels: ["Total Assets", "Total Issued", "Assets In Stock", "Damaged Assets",],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 150, 170, 220, 260],
        backgroundColor: [
          "red",
          "green",
          "blue",
          "orange",
   
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }} className=" bg-white shadow-md p-5 rounded-lg mb-10">
      <Bar data={data} options={options} />
    </div>
  );
}

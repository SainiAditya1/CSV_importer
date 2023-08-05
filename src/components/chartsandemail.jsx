import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

const ChartAndEmail = ({ csvData }) => {
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const handleGenerateChart = () => {
    const data = {
      labels: csvData.map((entry) => entry.label),
      datasets: [
        {
          label: 'Data',
          data: csvData.map((entry) => entry.value),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  };

  return (
    <div>
      <div>
        <label>Chart Type: </label>
        <select value={chartType} onChange={handleChartTypeChange}>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      <div>
        <button onClick={handleGenerateChart}>Generate Chart</button>
      </div>

      <div>
        {chartType === "bar" ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <Pie data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default ChartAndEmail;

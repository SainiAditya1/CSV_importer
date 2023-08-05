import React, { useState } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';

function useChart() {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data.slice(1); // Assuming first row is header
        setData(parsedData);
      },
    });
  };

  const renderGraph = () => {
    if (!data) return null;

    const xValues = data.map((entry) => parseFloat(entry[0]));
    const yValues = data.map((entry) => parseFloat(entry[1]));

    const chartData = {
      labels: xValues,
      datasets: [
        {
          label: 'CSV Data',
          data: yValues,
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
        },
      ],
    };

    return <Line data={chartData} />;
  };

  return (
    <div>
      <h1>CSV Graph Plotter</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {renderGraph()}
    </div>
  );
}

export default useChart;

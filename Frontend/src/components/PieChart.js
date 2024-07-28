// PieChart.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPieChartData = async () => {
      const monthNumber = new Date(`${selectedMonth} 1, 2024`).getMonth() + 1;
      try {
        const response = await axios.get('http://localhost:5000/api/pie-chart', {
          params: { month: monthNumber },
        });
        setChartData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch pie chart data:', error);
        setLoading(false);
      }
    };

    fetchPieChartData();
  }, [selectedMonth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!chartData) {
    return <p>No data available for the selected month.</p>;
  }

  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        data: Object.values(chartData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    
    <div className="Pie" >
        <h2>PieChart Stats - {selectedMonth}</h2>
        <Pie data={data} width={100} height={100} />
    </div>
  );
};

export default PieChart;

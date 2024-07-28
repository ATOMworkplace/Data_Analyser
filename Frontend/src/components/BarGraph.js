import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarGraph = ({ month }) => {
  const [priceRangeData, setPriceRangeData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchPriceRangeData(month);
  }, [month]);

  const fetchPriceRangeData = async (month) => {
    const monthNumber = new Date(`${month} 1, 2024`).getMonth() + 1;
    try {
      const response = await axios.get('http://localhost:5000/api/transactions/price-range', {
        params: { month: monthNumber },
      });
      const data = response.data;

      setPriceRangeData({
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Number of Items',
            data: Object.values(data),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch price range data:', error);
    }
  };

  return (
    <div className="bar-graph-container">
      <h2>BarChart Stats - {month}</h2>
      <Bar data={priceRangeData} />
    </div>
  );
};

export default BarGraph;

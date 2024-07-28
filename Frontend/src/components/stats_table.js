import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsTable = ({ month }) => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });

  useEffect(() => {
    fetchStats(month);
  }, [month]);

  const fetchStats = async (month) => {
    const monthNumber = new Date(`${month} 1, 2024`).getMonth() + 1;
    try {
      const response = await axios.get('http://localhost:5000/api/transactions/stats', {
        params: {
          month: monthNumber,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  return (
    <div className="stats-table">
      <h2>Statistics - {month}</h2>
      <table>
        <thead>
          <tr>
            <th>Total Sales</th>
            <th>Total Sold Items</th>
            <th>Total Unsold Items</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${stats.totalSales.toFixed(2)}</td>
            <td>{stats.totalSoldItems}</td>
            <td>{stats.totalUnsoldItems}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;

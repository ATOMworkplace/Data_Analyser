import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';
import StatsTable from './stats_table';
import BarGraph from './BarGraph'; // Import BarGraph component
import PieChart from './PieChart'; // Import PieChart component

const Table1 = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [expandedTransactions, setExpandedTransactions] = useState({}); // State to manage expanded content for each transaction

  useEffect(() => {
    fetchTransactions(page, perPage, month, search, sortColumn, sortOrder);
  }, [page, perPage, month, search, sortColumn, sortOrder]);

  const fetchTransactions = async (page, perPage, month, search, sortColumn, sortOrder) => {
    const monthNumber = new Date(`${month} 1, 2024`).getMonth() + 1;
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: {
          page,
          per_page: perPage,
          month: monthNumber,
          search,
          sort_column: sortColumn,
          sort_order: sortOrder,
        },
      });
      setTransactions(response.data.transactions);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const handleNextPage = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setPage(1); // Reset to first page when month changes
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const toggleExpand = (id, field) => {
    setExpandedTransactions((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const renderContent = (content, id, field) => {
    const words = content.split(' ');
    const isExpanded = expandedTransactions[id]?.[field];
    console.log(`Rendering content for ${field} of transaction ${id}:`, { isExpanded, content, words });
    if (words.length <= 5 || isExpanded) {
      return (
        <span>
          {content}
          {words.length > 5 && (
            <span onClick={() => toggleExpand(id, field)} style={{ color: 'blue', cursor: 'pointer' }}> Read Less</span>
          )}
        </span>
      );
    } else {
      return (
        <span>
          {words.slice(0, 5).join(' ')}...
          <span onClick={() => toggleExpand(id, field)} style={{ color: 'blue', cursor: 'pointer' }}> Read More</span>
        </span>
      );
    }
  };

  return (
    <div>
      <Header
        month={month}
        onMonthChange={handleMonthChange}
        search={search}
        onSearchChange={handleSearchChange}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
      <div className="table1">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th onClick={() => handleSort('title')}>Title</th>
              <th onClick={() => handleSort('description')}>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{renderContent(transaction.title, transaction.id, 'title')}</td>
                <td className="desc">{renderContent(transaction.description, transaction.id, 'description')}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                <td className="col-img">
                  <img src={transaction.image} alt={transaction.title} style={{ width: '50px', height: '50px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="action-btns">
        <div className="pg-nbr">
          <p>Page No: {page}</p>
        </div>
        <div className="pg-btns">
          <button onClick={handleNextPage} disabled={page * perPage >= total}>Next</button>
          <button onClick={handlePrevPage} disabled={page === 1}>Prev</button>
        </div>
        <div className="per-pg-nbr">
          <p>Per Page: {perPage}</p>
        </div>
      </div>
      <StatsTable month={month} />
      <BarGraph month={month} />
      <PieChart selectedMonth={month} /> {/* Add PieChart component */}
    </div>
  );
};

export default Table1;

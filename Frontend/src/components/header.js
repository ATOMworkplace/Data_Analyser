import React from 'react';

const Header = ({ month, onMonthChange, search, onSearchChange }) => {
  return (
    <div className="Header">
      <div className="header-top">
        <h2>Transaction Board</h2>
      </div>
      <div className="header-down">
        <div className="left-header">
          <input
            type="text"
            id="search-box"
            className="search-box"
            placeholder="Search transaction"
            value={search}
            onChange={onSearchChange}
          />
        </div>
        <div className="right-header">
          <label htmlFor="month" className="label-drop">Select Month</label>
          <select
            id="month"
            name="month"
            className="month"
            value={month}
            onChange={onMonthChange}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;

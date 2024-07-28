const cors = require('cors');
// const fetch = require('node-fetch'); // Remove this line
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dynamic import for node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Fetch transactions from the given URL
const fetchTransactions = async () => {
  const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
  return response.json();
};

// API endpoint to list transactions with search and pagination
app.get('/api/transactions', async (req, res) => {
  const { search = '', page = 1, per_page = 10, month } = req.query;

  try {
    const transactions = await fetchTransactions();

    // Filter transactions based on search query and month
    const filteredTransactions = transactions.filter(transaction => {
      const searchLower = search.toLowerCase();
      const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;

      const matchesSearch = (
        transaction.title.toLowerCase().includes(searchLower) ||
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.price.toString().includes(searchLower)
      );

      const matchesMonth = transactionMonth === parseInt(month, 10);

      return matchesSearch && matchesMonth;
    });

    // Pagination logic
    const total = filteredTransactions.length;
    const start = (page - 1) * per_page;
    const end = start + parseInt(per_page);
    const paginatedTransactions = filteredTransactions.slice(start, end);

    res.json({
      total,
      page: parseInt(page),
      per_page: parseInt(per_page),
      transactions: paginatedTransactions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// API endpoint to get transaction statistics for a specific month
app.get('/api/transactions/stats', async (req, res) => {
  const { month } = req.query;

  try {
    const transactions = await fetchTransactions();
    const monthNumber = parseInt(month, 10);

    const filteredTransactions = transactions.filter(transaction => {
      const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
      return transactionMonth === monthNumber;
    });

    const totalSales = filteredTransactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold).length;
    const totalUnsoldItems = filteredTransactions.length - totalSoldItems;

    res.json({
      totalSales,
      totalSoldItems,
      totalUnsoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// API endpoint to get transaction price range statistics for a specific month
app.get('/api/transactions/price-range', async (req, res) => {
  const { month } = req.query;

  try {
    const transactions = await fetchTransactions();
    const monthNumber = parseInt(month, 10);

    const filteredTransactions = transactions.filter(transaction => {
      const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
      return transactionMonth === monthNumber;
    });

    const priceRanges = {
      '0-50': 0,
      '51-100': 0,
      '101-150': 0,
      '151-200': 0,
      '201+': 0,
    };

    filteredTransactions.forEach(transaction => {
      if (transaction.price <= 50) {
        priceRanges['0-50']++;
      } else if (transaction.price <= 100) {
        priceRanges['51-100']++;
      } else if (transaction.price <= 150) {
        priceRanges['101-150']++;
      } else if (transaction.price <= 200) {
        priceRanges['151-200']++;
      } else {
        priceRanges['201+']++;
      }
    });

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price range statistics' });
  }
});

// API endpoint to get pie chart data for a specific month
app.get('/api/pie-chart', async (req, res) => {
  const { month } = req.query;

  try {
    const transactions = await fetchTransactions();
    const monthNumber = parseInt(month, 10);

    const filteredTransactions = transactions.filter(transaction => {
      const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
      return transactionMonth === monthNumber;
    });

    const categoryCounts = {};

    filteredTransactions.forEach(transaction => {
      const category = transaction.category || 'Unknown';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    res.json(categoryCounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
});

// API endpoint to get combined data
app.get('/api/combined-data', async (req, res) => {
  const { month } = req.query;

  try {
    const [statsResponse, priceRangeResponse, pieChartResponse] = await Promise.all([
      fetch(`http://localhost:${PORT}/api/transactions/stats?month=${month}`).then(res => res.json()),
      fetch(`http://localhost:${PORT}/api/transactions/price-range?month=${month}`).then(res => res.json()),
      fetch(`http://localhost:${PORT}/api/pie-chart?month=${month}`).then(res => res.json()),
    ]);

    const combinedData = {
      stats: statsResponse,
      priceRanges: priceRangeResponse,
      pieChart: pieChartResponse,
    };

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

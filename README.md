<h1>Data Analyser</h1>
<h2 id="project-overview">Project Overview</h2>
<p>Data Analyser is a comprehensive project designed to analyze product transaction data. It fetches transaction data from an external API, processes it, and provides various statistics, visualizations, and search functionalities. The project includes features such as listing transactions, filtering by month and search query, pagination, and generating charts (bar and pie) for visual representation of data.</p>

<h2 id="tech-stack">Tech Stack</h2>
<h3>Frontend</h3>
<ul>
<li>React.js</li>
<li>Chart.js</li>
<li>HTML</li>
<li>CSS</li>
</ul>

<h3>Backend</h3>
<ul>
<li>Node.js</li>
<li>Express.js</li>
<li>Node-fetch</li>
</ul>

<h2 id="file-structure">File Structure</h2>
<pre><code>.
├── backend
│   ├── server.js
│   └── ...
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── Header.js
│   │   │   ├── SearchBox.js
│   │   │   ├── TransactionsTable.js
│   │   │   ├── StatsTable.js
│   │   │   ├── BarGraph.js
│   │   │   └── PieChart.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   └── package.json
├── README.md
└── package.json
</code></pre>

<h2 id="getting-started">Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
<li>Node.js installed on your local machine</li>
<li>npm or yarn package manager</li>
</ul>

<h3>Installation</h3>
<pre><code>git clone https://github.com/your-username/data-analyser.git
cd data-analyser
</code></pre>

<h3>Running the Backend</h3>
<pre><code>cd backend
npm install
node server.js
</code></pre>

<h3>Running the Frontend</h3>
<pre><code>cd frontend
npm install
npm start
</code></pre>

<h2 id="demo-and-screenshots">Demo and Screenshots</h2>
<p>Below are some screenshots and a brief demo of the Data Analyser application:</p>


<h2 id="how-it-works">How It Works</h2>
<h3>Backend</h3>
<p>The backend is built using Node.js and Express.js. It fetches transaction data from an external API, processes it, and provides several endpoints:</p>
<ul>
<li><code>/api/transactions</code>: Lists transactions with search and pagination functionality.</li>
<li><code>/api/transactions/stats</code>: Provides transaction statistics for a specific month.</li>
<li><code>/api/transactions/price-range</code>: Provides price range statistics for transactions in a specific month.</li>
<li><code>/api/pie-chart</code>: Provides category-wise transaction counts for a specific month.</li>
</ul>

<h3>Frontend</h3>
<p>The frontend is built using React.js. It provides an interactive user interface to visualize transaction data. The main components are:</p>
<ul>
<li><code>Header.js</code>: Displays the header of the application.</li>
<li><code>SearchBox.js</code>: Provides a search box for filtering transactions.</li>
<li><code>TransactionsTable.js</code>: Displays the list of transactions with pagination.</li>
<li><code>StatsTable.js</code>: Displays statistics for transactions in a specific month.</li>
<li><code>BarGraph.js</code>: Displays a bar graph of price ranges.</li>
<li><code>PieChart.js</code>: Displays a pie chart of category-wise transaction counts.</li>
</ul>

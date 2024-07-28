import React from 'react';
import Header from './header.js';
import Table1 from './main_table.js';
import Table2 from './stats_table.js';
const Home =()=>{
    return(
        <div>
            <Table1 />
            <div className="animated-footer">
            </div>
        </div>
    )

}

export default Home;
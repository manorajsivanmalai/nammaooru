import React, { useContext, useState } from 'react';
import { DataContext } from '../contextapi/dataContextApi';
import "../assets/scss/adduser.css"
const CollectionsAmount = () => {
  const {data} = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter(
    (item) =>
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amount.toString().includes(searchTerm) ||
      item.date.includes(searchTerm) ||
      item.id.toString().includes(searchTerm))
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="">
       
      <div className="row my-3">
        <div className="col-md-6 my-2" >
          <h4 className='text-center my-3 '>All Collection Amount</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-control"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 ovflow">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th onClick={() => requestSort('id')} className="sortable">Id</th>
                <th onClick={() => requestSort('name')} className="sortable">Name</th>
                <th onClick={() => requestSort('amount')} className="sortable">Amount</th>
                <th onClick={() => requestSort('date')} className="sortable">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.amount.toLocaleString()}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollectionsAmount;

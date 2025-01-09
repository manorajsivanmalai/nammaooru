import React, { useContext, useState } from 'react';
import { DataContext } from '../contextapi/memberContextApi';
import "../assets/scss/adduser.css"
const CollectionsAmount = () => {
  const { memclData, loading } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const sortedData = !loading && Array.isArray(memclData)  ? [...memclData].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  }) : [];
  
  const filteredData = sortedData?.filter(
    (item) =>
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.amount.toString().includes(searchTerm) ||
        item.createdAt.includes(searchTerm) ||
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

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    !loading ?(
      <div className="">
        <h4 className='text-center my-3'>All Collection Amount</h4>
        <div className="row my-3">
          <div className="col-md-6 my-2" >
        
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-6 my-2">
            <select
              className="form-control"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
               <option value="all">All Categories</option>
               <option value="boys">Boys</option>
               <option value="ourpeople">Our People</option>
               <option value="sponsors">Sponsors</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 ovflow">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th style={{width:"10%",textAlign:"center"}} onClick={() => requestSort('id')} className="sortable">Id</th>
                  <th style={{width:"30%",textAlign:"center"}} onClick={() => requestSort('name')} className="sortable">Name</th>
                  <th style={{width:"20%",textAlign:"center"}} onClick={() => requestSort('amount')} className="sortable">Amount</th>
                  <th style={{width:"40%",textAlign:"center"}} onClick={() => requestSort('createdAt')} className="sortable">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td style={{width:"10%",textAlign:"center"}}>{item.id}</td>
                    <td style={{width:"30%",textAlign:"center"}}>{item.name}</td>
                    <td style={{width:"20%",textAlign:"center"}}>{item.amount.toLocaleString()}</td>
                    <td style={{width:"40%",textAlign:"center"}}>{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>) :
      (
        <h4>Loading...</h4>
      )
  );
};

export default CollectionsAmount;

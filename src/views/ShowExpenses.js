import { ExpensesContext } from "../contextapi/expensesContextApi";
import { useState, useContext, useMemo, useCallback } from "react";
import { useDebounce } from 'use-debounce';
import formatDate from '../utils/dateFormate';
const ShowExpenses = () => {
  const { expenses, exploading } = useContext(ExpensesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce the search input by 500ms
  const uniqueYears = [
    ...new Set(
      expenses.map(item => new Date(item.createdAt).getFullYear())
    )
  ];
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const sortedData = useMemo(() => {
    if (exploading || !Array.isArray(expenses)) return [];
    
    const sorted = [...expenses];
    if (sortConfig !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [expenses, sortConfig, exploading]);

  // Memoize filtered data based on debounced search term
  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      (item.reason.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.amount.toString().includes(debouncedSearchTerm) ||
      item.createdAt.includes(debouncedSearchTerm) ||
      item.id.toString().includes(debouncedSearchTerm)) &&  item.createdAt.includes(selectedYear)
    );
  }, [debouncedSearchTerm, sortedData,selectedYear]);

  const requestSort = useCallback((key) => {
    setSortConfig((prevConfig) => {
      let direction = 'ascending';
      if (prevConfig && prevConfig.key === key && prevConfig.direction === 'ascending') {
        direction = 'descending';
      }
      return { key, direction };
    });
  }, []);


  return (
    !exploading ? (
      <div className="">
        <div className="row my-3">
          <h4 className="text-center my-3">All Expenses</h4>
          <div className="col-md-6 my-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
         <div className="col-md-6 my-2">
             <select value={selectedYear || new Date().getFullYear()}  className="form-control" onChange={(e) => setSelectedYear(e.target.value)}>
              {uniqueYears.map((item, index) => (
                <option  key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            
          </div>

        </div>
        <div className="row">
          <div className="col-md-12 overflow-auto">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "10%", textAlign: "center" }} onClick={() => requestSort('id')} className="sortable">Id</th>
                  <th style={{ width: "40%", textAlign: "center" }} onClick={() => requestSort('reason')} className="sortable">Reason</th>
                  <th style={{ width: "20%", textAlign: "center" }} onClick={() => requestSort('amount')} className="sortable">Amount</th>
                  <th style={{ width: "40%", textAlign: "center" }} onClick={() => requestSort('createdAt')} className="sortable">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map((item,index) => (
                  <tr key={item.id}>
                    <td style={{ width: "10%", textAlign: "center" }}>{index+1}</td>
                    <td style={{ width: "40%", textAlign: "center" }}>{item.reason}</td>
                    <td style={{ width: "20%", textAlign: "center" }}>{item.amount.toLocaleString()}</td>
                    <td style={{ width: "40%", textAlign: "center" }}>{formatDate(item.createdAt)}</td>
                  </tr>
                )) : (
                  <tr className="text-center">
                    <td colSpan={4}>No expenses found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <h4>Loading...</h4>
    )
  );
};

export default ShowExpenses;

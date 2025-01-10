import { ExpensesContext } from "../contextapi/expensesContextApi";
import { useState, useContext, useMemo, useCallback } from "react";
import { useDebounce } from 'use-debounce';

const ShowExpenses = () => {
  const { expenses, exploading } = useContext(ExpensesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce the search input by 500ms

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
      item.reason.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.amount.toString().includes(debouncedSearchTerm) ||
      item.createdAt.includes(debouncedSearchTerm) ||
      item.id.toString().includes(debouncedSearchTerm)
    );
  }, [debouncedSearchTerm, sortedData]);

  const requestSort = useCallback((key) => {
    setSortConfig((prevConfig) => {
      let direction = 'ascending';
      if (prevConfig && prevConfig.key === key && prevConfig.direction === 'ascending') {
        direction = 'descending';
      }
      return { key, direction };
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    !exploading ? (
      <div className="">
        <div className="row my-3">
          <div className="col-md-12 my-2">
            <h4 className="text-center my-3">All Expenses</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
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
                {filteredData.length > 0 ? filteredData.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: "10%", textAlign: "center" }}>{item.id}</td>
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

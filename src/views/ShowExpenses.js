import { ExpensesContext } from "../contextapi/expensesContextApi";
import { useState, useContext } from "react";

const ShowExpenses = () => {
  const { expense, exploading } = useContext(ExpensesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedData = !exploading && Array.isArray(expense)
    ? [...expense].sort((a, b) => {
      if (sortConfig !== null) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
      }
      return 0;
    })
    : [];


  const filteredData = sortedData?.filter(
    (item) =>
    (item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  return (
    !exploading ? (<div className="">

      <div className="row my-3">
        <div className="col-md-6 my-2" >
          <h4 className='text-center my-3 '>All Expenses</h4>
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
        <div className="col-md-12 ovflow">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th onClick={() => requestSort('id')} className="sortable">Id</th>
                <th onClick={() => requestSort('reason')} className="sortable">Reason</th>
                <th onClick={() => requestSort('Amount')} className="sortable">Amount</th>
                <th onClick={() => requestSort('date')} className="sortable">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.reason}</td>
                  <td>{item.amount.toLocaleString()}</td>
                  <td>{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    ) : (
      <h4>Loading...</h4> 
    ));
}
export default ShowExpenses;
import React, { useContext, useState } from "react";
import { ExpensesContext } from "../contextapi/expensesContextApi";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../assets/scss/adduser.css";

const ExpensesDetails = () => {
  const { expense, setExpense } = useContext(ExpensesContext);
  const location = useLocation();
  const { exp } = location.state || {};
  const [expdetail, setExpdetail] = useState(exp || {});
  const navigate =useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setExpdetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    setExpense((prev) =>
      prev.map((item) => (item.id === exp.id ? { ...item, ...expdetail } : item))
    );
    // Optionally add a feedback mechanism here
  };

  const handleDelete = () => {
    setExpense((prev) => prev.filter((item) => item.id !== exp.id));
    // Optionally redirect or show feedback
     
     navigate("/expenses");
  };

  return (
    <div className="expense-detail">
      <h4>Expenses Details</h4>
      <div className="expense-fields">
        <div>
          <label htmlFor="id">Id</label>
          <input type="text" name="id" value={expdetail.id || ''} disabled />
        </div>
        <div>
          <label htmlFor="reason">Reason</label>
          <input
            type="text"
            name="reason"
            value={expdetail.reason || ''}
            onChange={handlechange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            name="amount"
            value={expdetail.amount || ''}
            onChange={handlechange}
          />
        </div>
        <div className="save">
          <button onClick={handleClick}>
            Save <FaSave />
          </button>
          <button onClick={handleDelete}>
            Delete <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDetails;

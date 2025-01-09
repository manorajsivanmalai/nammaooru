import React, { useContext, useState } from "react";
import { ExpensesContext } from "../contextapi/expensesContextApi";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../assets/scss/adduser.css";

const ExpensesDetails = () => {
  const { setExpenses } = useContext(ExpensesContext);
  const [saveLoad ,setSaveLoading]=useState(true)
  const [delLoading,setdelLoading]=useState(true)
  const location = useLocation();
  const { exp } = location.state || {};
  const [expdetail, setExpdetail] = useState(exp || {});
  const navigate =useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setExpdetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaveLoading(false);
    try {
      const response = await fetch(`/api/expense/${exp.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expdetail), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update expense');
      }
  
      const updatedExpense = await response.json();
      setSaveLoading(true)
      setExpenses((prev) =>
        prev.map((item) => (item.id === updatedExpense.id ? updatedExpense : item))
      );
      navigate("/showexpenses");
    } catch (error) {
      setSaveLoading(true)
      console.error("Error updating expense:", error);
    }
  };
  

  const handleDelete = async () => {
    setdelLoading(false);
    try {

      const response = await fetch(`/api/expense/${exp.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
  
      setExpenses((prev) => prev.filter((item) => item.id !== exp.id));
      setdelLoading(true)
      navigate("/expenses");
  
    } catch (error) {
      setdelLoading(true)
      console.error("Error deleting expense:", error);
    }
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
        <div className='save'>
                            <button onClick={(e)=>handleSave(e)} disabled={!saveLoad ||!delLoading} style={{background:!saveLoad ||!delLoading?"#e5bdbd":"red"}}>{!saveLoad?"Saving...":<>Save <FaSave /></>  }</button>
                            <button onClick={(e)=>handleDelete(e) } disabled={!saveLoad ||!delLoading} style={{background:!saveLoad ||!delLoading?"#e5bdbd":"red"}}>{!delLoading?"Deleting...":<>Delete <MdDelete /></>  } </button>
           </div>
      </div>
    </div>
  );
};

export default ExpensesDetails;

import React, { useContext } from "react";
import '../assets/scss/adduser.css';
import { useState } from "react";
import { ExpensesContext } from "../contextapi/expensesContextApi";
import { FaEdit } from "react-icons/fa";
import { IoMdArrowDroprightCircle,IoMdArrowDropleftCircle  } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Expenses = () => {
    const [formdata, setFormdata] = useState({
        reason: '',
        amount: ''
    })
    const { expense, setExpense } = useContext(ExpensesContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const handlSubmitExpenses = (e) => {
        e.preventDefault();
        setExpense((prev) => [...prev, formdata])
        setFormdata({
            reason: '',
            amount: ''
        })
    }
    const totalPages = Math.ceil(expense.length / itemsPerPage);
    const paginatedData = expense.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
      console.log(formattedDate);
  
    const handleChange = (e) => {
        setFormdata((prev) => {
            return { ...prev, id:expense.length+1, [e.target.name]: e.target.value, date: formattedDate}
        })
    }



    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
      const navigate = useNavigate();
      const handleLink = (item) => {
        navigate("/expensesdetails", { state: { exp: item } });
      };
      

    return (
        <div className="expenses">
            <form onSubmit={(e) => handlSubmitExpenses(e)}>
                <div >
                    <label>Reason</label>
                    <input type="text" name="reason" value={formdata.reason || ''} required onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Amount</label>
                    <input type="text" name="amount" value={formdata.amount || ''} required onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <button type="submit">submit</button>
                </div>
            </form>

            <div className="expense-table">
                <table className="table">
                    <thead>
                        <tr>
                            <td>S.No</td>
                            <td>Reason</td>
                            <td>Amount</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length !== 0 ? paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.reason}</td>
                                <td>{item.amount}</td>
                                <td> <FaEdit onClick={() => handleLink(item)} /></td>
                            </tr>
                        )) :
                            <tr className="text-center">
                                <td colSpan={4}>no expenses</td>
                            </tr>
                        }
                    </tbody>
                </table>
            <div className="pagination">
                    <IoMdArrowDropleftCircle onClick={handlePreviousPage} disabled={currentPage === 1} style={{color:currentPage === 1?"#dbb1b1":"inherit"}}/>
                    <span>
                    Page {currentPage} of {totalPages}
                    </span>
                    <IoMdArrowDroprightCircle onClick={handleNextPage} disabled={currentPage === totalPages} style={{color:currentPage === totalPages?"#dbb1b1":"inherit"}}/>
                </div>
            </div>
        </div>
    );
};

export default Expenses;

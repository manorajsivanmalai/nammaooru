import React, { useContext } from "react";
import '../assets/scss/adduser.css';
import { useState } from "react";
import { ExpensesContext } from "../contextapi/expensesContextApi";
import { FaEdit ,FaSave} from "react-icons/fa";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Expenses = () => {
    const { expenses, setExpenses, exploading } = useContext(ExpensesContext);
    const [formdata, setFormdata] = useState({
        reason: '',
        amount: 0
    });
    const [addLoad,setAddLoad]=useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = exploading ? Math.ceil(expenses.length / itemsPerPage) : 0;
    const paginatedData = expenses?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


  
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

    const handlSubmitExpenses =async (e) => {
        e.preventDefault();
        setAddLoad(false);
        try {
            const response = await fetch("/api/addexpense", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", 
              },
              body: JSON.stringify(formdata),
            });
        
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
        
            const result = await response.json();
            setExpenses((prev)=>{
             return [...prev,result]
            })
            setAddLoad(true);
          } catch (error) {
            console.error("Error:", error);
            setAddLoad(true);
          }
          
        setFormdata({
            reason: '',
            amount: 0
        })
    }



    const navigate = useNavigate();
    const handleLink = (item) => {
        navigate("/expensesdetails", { state: { exp: item } });
    };
    const handleChange = (e) => {
        setFormdata((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <div className="expenses">
            <form onSubmit={(e) => handlSubmitExpenses(e)}>
                <div >
                    <label>Reason</label>
                    <input type="text" name="reason" value={formdata.reason || ''} required onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Amount</label>
                    <input value={ formdata.amount ===undefined || formdata.amount === 0 ? '':parseInt(formdata.amount)} type="number" name="amount"  required onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <button type="submit" disabled={!addLoad} style={{backgroundColor:!addLoad?"#ada1a1":"red"}}>{!addLoad?<span>Saving...</span>:<span>Save <FaSave/></span>}</button>
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
                        {paginatedData?.length !== 0 ? paginatedData?.map((item, index) => (
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
                    <IoMdArrowDropleftCircle onClick={handlePreviousPage} disabled={currentPage === 1} style={{ color: currentPage === 1 ? "#dbb1b1" : "inherit" }} />
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <IoMdArrowDroprightCircle onClick={handleNextPage} disabled={currentPage === totalPages} style={{ color: currentPage === totalPages ? "#dbb1b1" : "inherit" }} />
                </div>
            </div>
        </div>
    );
};

export default Expenses;

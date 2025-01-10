import '../assets/scss/adduser.css';
import { ExpensesContext } from "../contextapi/expensesContextApi";
import { FaEdit ,FaSave} from "react-icons/fa";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useMemo } from "react";

const Expenses = () => {
    const { expenses, setExpenses, exploading } = useContext(ExpensesContext);
    const [formdata, setFormdata] = useState({ reason: '', amount: 0 });
    const [addLoad, setAddLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoize paginated data and total pages to avoid unnecessary recalculation
    const totalPages = useMemo(() => exploading ? Math.ceil(expenses.length / itemsPerPage) : 0, [expenses, exploading]);
    const paginatedData = useMemo(() => expenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ), [expenses, currentPage]);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Form submission handler
    const handleSubmitExpenses = async (e) => {
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

            if (!response.ok) throw new Error("Network response was not ok");

            const result = await response.json();
            setExpenses((prev) => [...prev, result]);
            setAddLoad(true);
        } catch (error) {
            console.error("Error:", error);
            setAddLoad(true);
        }
        setFormdata({ reason: '', amount: 0 });
    };

    const navigate = useNavigate();
    const handleLink = (item) => {
        navigate("/expensesdetails", { state: { exp: item } });
    };

    const handleChange = (e) => {
        setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="expenses">
            <form onSubmit={handleSubmitExpenses}>
                <div>
                    <label>Reason</label>
                    <input type="text" name="reason" value={formdata.reason} required onChange={handleChange} />
                </div>
                <div>
                    <label>Amount</label>
                    <input value={formdata.amount || ''} type="number" name="amount" required onChange={handleChange} />
                </div>
                <div>
                    <button type="submit" disabled={!addLoad} style={{ backgroundColor: !addLoad ? "#ada1a1" : "red" }}>
                        {!addLoad ? "Saving..." :<>Save  <FaSave /></> }
                    </button>
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
                        {paginatedData.length > 0 ? paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.reason}</td>
                                <td>{item.amount}</td>
                                <td><FaEdit onClick={() => handleLink(item)} /></td>
                            </tr>
                        )) : (
                            <tr className="text-center">
                                <td colSpan={4}>No expenses</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination">
                    <IoMdArrowDropleftCircle onClick={handlePreviousPage} disabled={currentPage === 1} style={{ color: currentPage === 1 ? "#dbb1b1" : "inherit" }} />
                    <span>Page {currentPage} of {totalPages}</span>
                    <IoMdArrowDroprightCircle onClick={handleNextPage} disabled={currentPage === totalPages} style={{ color: currentPage === totalPages ? "#dbb1b1" : "inherit" }} />
                </div>
            </div>
        </div>
    );
};

export default Expenses;

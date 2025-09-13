import React, { useContext, useMemo ,useState} from "react";
import { DataContext } from "../../contextapi/memberContextApi";
import { ExpensesContext } from "../../contextapi/expensesContextApi";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { AiFillBank } from "react-icons/ai";
import "../../assets/scss/adduser.css"
const OverView = () => {
    
    const {memclData,loading} =useContext(DataContext);
    const {expenses,exploading} = useContext(ExpensesContext);
    const uniqueYears = [
        ...new Set([
            ...expenses.map(item => new Date(item.createdAt).getFullYear()),
            ...memclData.map(item => new Date(item.createdAt).getFullYear())
        ])
        ].sort((a, b) => a - b);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
 
  
    const ttlclAmount = useMemo(() => {
    if (loading || !memclData?.length) return 0;

    return memclData
        .filter(item => new Date(item.createdAt).getFullYear() === Number(selectedYear))
        .reduce((total, item) => {
        const amount = parseInt(item.amount, 10);
        return total + (Number.isNaN(amount) ? 0 : amount);
        }, 0);
    }, [memclData, loading, selectedYear]);

    
    
     const ttlExpense = useMemo(() => {
  if (exploading || !expenses?.length) return 0;

  return expenses
    .filter(item => new Date(item.createdAt).getFullYear() === Number(selectedYear))
    .reduce((total, item) => {
      const amount = parseInt(item.amount, 10);
      return total + (Number.isNaN(amount) ? 0 : amount);
    }, 0);
}, [expenses, exploading, selectedYear]);

  return (
     
    <div className="overview-board">
         <main className="py-6 bg-surface-secondary">
                <div className="container-fluid">
                    <div className="row g-6 mb-6">
                         <div className="col-xl-4 col-sm-6 col-12">
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">select year</span>
                                             <select value={selectedYear || new Date().getFullYear()}  className="form-control" onChange={(e) => setSelectedYear(e.target.value)}>
                                                {uniqueYears.map((item, index) => (
                                                    <option  key={index} value={item}>
                                                    {item}
                                                    </option>
                                                ))}
                                                </select>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape  text-lg rounded-circle">
                                                 
                                            </div>
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Members Paid</span>
                                            <span className="h3 font-bold mb-0">{!loading && memclData.filter(item=>item.createdAt.includes(selectedYear))?.length > 0? memclData.filter(item=>item.createdAt.includes(selectedYear))?.length:0}</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape  text-lg rounded-circle">
                                             <FaPeopleGroup />
                                            </div>
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Collection Amount</span>
                                            <span className="h3 font-bold mb-0">{!loading ? ttlclAmount:0}</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape   text-lg rounded-circle">
                                              <FaWallet />
                                            </div>
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Expenses</span>
                                            <span className="h3 font-bold mb-0">{!exploading ? ttlExpense:0}</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape text-lg rounded-circle">
                                               <GiExpense />
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Available balance</span>
                                            <span className="h3 font-bold mb-0">{!loading && !exploading ? ttlclAmount - ttlExpense :0}</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape text-lg rounded-circle">
                                               <AiFillBank />
                                            </div>
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </main>
    </div>

  )
}
export default OverView
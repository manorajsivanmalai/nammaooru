import React, { useContext } from "react";

import { DataContext } from "../../contextapi/memberContextApi";
import { ExpensesContext } from "../../contextapi/expensesContextApi";

import { FaPeopleGroup } from "react-icons/fa6";
import "../../assets/scss/adduser.css"
import { FaWallet } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { AiFillBank } from "react-icons/ai";
const OverView = () => {

    const {memclData,loading} =useContext(DataContext);
    const {expenses,exploading} = useContext(ExpensesContext);
 
    const ttlclAmount = !loading && memclData?.length > 0
    ? memclData.reduce((total, item) => {
        const amount = parseInt(item.amount);
        return total + (Number.isNaN(amount) ? 0 : amount); 
      }, 0)
    : 0;

  const ttlExpense = !exploading && expenses?.length > 0
    ? expenses.reduce((total, item) => {
        const amount = parseInt(item.amount);
        return total + (Number.isNaN(amount) ? 0 : amount); 
      }, 0)
    : 0;


  return (
  
     
    <div className="overview-board">
         <main className="py-6 bg-surface-secondary">
                <div className="container-fluid">
                    <div className="row g-6 mb-6">
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Members Paid</span>
                                            <span className="h3 font-bold mb-0">{!loading && memclData?.length > 0? memclData?.length:0}</span>
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
                        <div className="col-xl-3 col-sm-6 col-12">
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
                        <div className="col-xl-3 col-sm-6 col-12">
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
                        <div className="col-xl-3 col-sm-6 col-12">
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
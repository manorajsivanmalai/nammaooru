import React, { useContext } from "react";

import { DataContext } from "../../contextapi/dataContextApi";
import { ExpensesContext } from "../../contextapi/expensesContextApi";

import { FaPeopleGroup } from "react-icons/fa6";
import "../../assets/scss/adduser.css"
import { FaWallet } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { AiFillBank } from "react-icons/ai";
const OverView = () => {

    const {data,setData} =useContext(DataContext);
    const {expense,setExpense} =useContext(ExpensesContext);
    const ttlclAmount = data.reduce((total, item) => {
        return total + (parseInt(item.amount) || 0);
      }, 0);

    const ttlExpense=expense.reduce((total,item)=>{
        return total +(parseInt(item.amount) || 0);
    },0)  

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
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Members</span>
                                            <span className="h3 font-bold mb-0">{data.length}</span>
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
                                            <span className="h3 font-bold mb-0">{ttlclAmount}</span>
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
                                            <span className="h3 font-bold mb-0">{ttlExpense}</span>
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
                                            <span className="h3 font-bold mb-0">{ttlclAmount-ttlExpense}</span>
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
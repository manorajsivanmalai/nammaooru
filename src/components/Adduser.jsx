import React, { useContext, useState } from 'react';
import '../assets/scss/adduser.css';
import Membertable from './Membertable';
import { DataContext } from '../contextapi/memberContextApi';
import { IoPersonAddSharp } from "react-icons/io5";
const AddUser = () => {

 const { setMemclData }=useContext(DataContext);
 const [addLoad,setAddLoad]=useState(true);
const [formData,setFormdata]=useState({
    name:'',
    amount:0,
    category:'category'
})

const handleFormSubmission =async (e) => {
        e.preventDefault();
        setAddLoad(false)

    try {
      const response = await fetch("/api/createmember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
    setMemclData((prev)=>{
       return [...prev,result]
      })
      setAddLoad(true)
     
    } catch (error) {
      console.error("Error:", error);
      setAddLoad(true)
    }

    setFormdata({
        name:'',
        amount:0,
        category:'category'
    })
      
    }
   const handleChange =(e)=>{
    setFormdata((prev)=>{
        return  { 
           ...prev,
           [e.target.name]:e.target.value
       }
     })
    
    }
    
    return (
        <div className='adduser'>
            <form
                onSubmit={(e)=>handleFormSubmission(e)}
                className=''>
                    <h3>Add Members</h3>
                <div className='name-input'>
                    <label htmlFor="name"></label>
                    <input value={formData.name || ''} name="name" type="text" placeholder='name' onChange={(e)=>handleChange(e)} required/>
                </div>
                <div className='amount-input'>
                    <label htmlFor="amount"></label>
                    <input value={ formData.amount ===undefined || formData.amount === 0 ? '':formData.amount} name="amount" type="number" placeholder='amount' onChange={(e)=>handleChange(e)} required />
                </div>
                 <div>
                    <select name="category" id="category" onChange={(e)=>handleChange(e)}value={formData.category} >
                        <option value="category">select category</option>
                        <option value="boys">Boys</option>
                        <option value="ourpeople">Our People</option>
                        <option value="sponsors">Sponsors</option>
                    </select>
                 </div>
                <div className='sub-but'>
                    <button  type="submit" disabled={formData.category === 'category' || !addLoad}  style={{backgroundColor:formData.category === 'category' || !addLoad ? "#a69c9c":"red"}}>{!addLoad?<span>Adding...</span>:<span>Add <IoPersonAddSharp /></span>}</button>
                </div>
            </form>

            <Membertable />
            
        </div>
    );
};
export default AddUser;
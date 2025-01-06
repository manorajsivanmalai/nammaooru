import React, { useState } from 'react';
import '../assets/scss/adduser.css';
import Membertable from './Membertable';
const AddUser = () => {

const [formData,setFormdata]=useState({
    name:'',
    amount:''
})

    const handleFormSubmission = (e) => {
        e.preventDefault();
      // store data to the member table
        setFormdata('');
      
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
        <div>
            <form
                onSubmit={handleFormSubmission}
                className=''>
                    <h3>Add Members</h3>
                <div className='name-input'>
                    <label htmlFor="name"></label>
                    <input value={formData.name} name="name" type="text" placeholder='name' onChange={(e)=>handleChange(e)} />
                </div>
                <div className='amount-input'>
                    <label htmlFor="amount"></label>
                    <input value={formData.amount} name="amount" type="text" placeholder='amount' onChange={(e)=>handleChange(e)} />
                </div>
                 <div>
                    <select name="categery" id="categery">
                        <option value="-1">select categery</option>
                        <option value="boys">Boys</option>
                        <option value="ourpeople">Our People</option>
                        <option value="sponsors">Sponsors</option>
                    </select>
                 </div>
                <div className='sub-but'>
                    <button  type="submit">Submit</button>
                </div>
            </form>

            <Membertable formData={formData} />
            
        </div>
    );
};
export default AddUser;
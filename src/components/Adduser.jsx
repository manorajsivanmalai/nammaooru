import React, { useContext, useState } from 'react';
import '../assets/scss/adduser.css';
import Membertable from './Membertable';
import { DataContext } from '../contextapi/dataContextApi';
const AddUser = () => {

    const {data,setData}=useContext(DataContext);

const [formData,setFormdata]=useState({
    id:data.length+1,
    name:'',
    amount:'',
    category:'category'
})

    const handleFormSubmission = (e) => {
        e.preventDefault();
       
      // store data to the member table
      setData((prev)=>{
       return [...prev,formData]
      })
      console.log(formData);
    setFormdata({
        name:'',
        amount:'',
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
    console.log(formData);
    return (
        <div>
            <form
                onSubmit={(e)=>handleFormSubmission(e)}
                className=''>
                    <h3>Add Members</h3>
                <div className='name-input'>
                    <label htmlFor="name"></label>
                    <input value={formData.name} name="name" type="text" placeholder='name' onChange={(e)=>handleChange(e)} required/>
                </div>
                <div className='amount-input'>
                    <label htmlFor="amount"></label>
                    <input value={formData.amount} name="amount" type="text" placeholder='amount' onChange={(e)=>handleChange(e)} required />
                </div>
                 <div>
                    <select name="category" id="category" onChange={(e)=>handleChange(e)} >
                        <option value="category">select category</option>
                        <option value="boys">Boys</option>
                        <option value="ourpeople">Our People</option>
                        <option value="sponsors">Sponsors</option>
                    </select>
                 </div>
                <div className='sub-but'>
                    <button  type="submit" disabled={formData.category === 'category'} style={{backgroundColor:formData.category === 'category'?"#a69c9c":"red"}}>Submit</button>
                </div>
            </form>

            <Membertable />
            
        </div>
    );
};
export default AddUser;
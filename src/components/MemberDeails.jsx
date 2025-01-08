import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/scss/adduser.css";
import { DataContext } from '../contextapi/memberContextApi';
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const MemberDetails = () => {
    const location = useLocation();
    const { member } = location.state || {}; 
    const { setMemclData} = useContext(DataContext);
    const [mem,setMem]=useState(member);

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setMemclData((prev) => {
          return  prev.map((cur,inx)=>{
                if (cur.id === mem.id) {
                    return { ...cur, [name]: value }; 
                }else {
                    return cur; 
                }
            })
           
        });
        setMem((prev)=>{
            return{...prev,[name]:value};
        })
    };
    
    const handleClick=(e)=>{
        
    }

  const handleDelete=(e)=>{

    }

    return (
        <div className="member-details">
            <h1>Member Details</h1>
            {mem ? (
                <div className='mem-detail'>
                    <div>
                        <label>ID:</label>
                        <input type="text" value={mem.id} disabled />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"  
                            value={mem.name || ''}  
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Amount:</label>
                        <input
                            type="text"
                            name="amount"  
                            value={mem.amount || ''}  
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                      <select name="category" id="category" onChange={(e)=>handleChange(e)} value={mem.category || ""} >
                        <option value="category">select category</option>
                        <option value="boys">Boys</option>
                        <option value="ourpeople">Our People</option>
                        <option value="sponsors">Sponsors</option>
                     </select>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email" 
                            value={mem.email || ''}  
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="tel"
                            name="phone"  
                            value={mem.phone || ''}  
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <textarea
                            id='textAdress'
                            name="address"  
                            value={mem.address || ''} 
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter address"
                        ></textarea>
                    </div>
                  <div className='save'>
                     <button onClick={(e)=>handleClick(e)} >Save  <FaSave /> </button>
                     <button onClick={(e)=>handleDelete(e)} >Delete <MdDelete /></button>
                  </div>
                </div>
            ) : (
                <p>No member details available</p>
            )}
        </div>
    );
};

export default MemberDetails;

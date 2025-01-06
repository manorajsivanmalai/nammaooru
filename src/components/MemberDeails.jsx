import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/scss/adduser.css";
import { DataContext } from '../contextapi/dataContextApi';

const MemberDetails = () => {
    const location = useLocation();
    const { member } = location.state || {}; // Get member details from state
    const { data, setData } = useContext(DataContext); // Access global state
    const [mem,setMem]=useState(member);
    // This effect will trigger every time `data` changes
   

    const handleChange = (e) => {
        const { name, value } = e.target; // Extract name and value from the event
        setData((prev) => {
          return  prev.map((cur,inx)=>{
                if (cur.id === mem.id) {
                    return { ...cur, [name]: value }; // Only update the matched value
                }else {
                    return cur; // If the IDs don't match, return the previous state
                }
            })
           
        });
        setMem((prev)=>{
            return{...prev,[name]:value};
        })
    };
  console.log(data);
    const handleClick=(e)=>{
        
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
                            name="name"  // Use the state key as the name
                            value={mem.name || ''}  // Default to empty string if undefined
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Amount:</label>
                        <input
                            type="text"
                            name="amount"  // Use the state key as the name
                            value={mem.amount || ''}  // Default to empty string if undefined
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                      <select name="category" id="category" onChange={(e)=>handleChange(e)} >
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
                            name="email"  // If you want to include email in the state
                            value={mem.email || ''}  // Assuming member.email exists
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="tel"
                            name="phone"  // If you want to include phone in the state
                            value={mem.phone || ''}  // Assuming member.phone exists
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <textarea
                            id='textAdress'
                            name="address"  // If you want to include address in the state
                            value={mem.address || ''}  // Assuming member.address exists
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter address"
                        ></textarea>
                    </div>
                  <div className='save'>
                     <button onClick={(e)=>handleClick(e)} >Save Changes</button>
                  </div>
                </div>
            ) : (
                <p>No member details available</p>
            )}
        </div>
    );
};

export default MemberDetails;

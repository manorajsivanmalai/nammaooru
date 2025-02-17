import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../assets/scss/adduser.css";
import { DataContext } from '../contextapi/memberContextApi';
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const MemberDetails = () => {
    const location = useLocation();
    const [saveLoad,setSaveLoading]=useState(true);
    const [delLoading,setDelLoading]=useState(true);
    const { member } = location.state || {}; 
    const { setMemclData} = useContext(DataContext);
    const [mem,setMem]=useState(member);
    const navigate=useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target; 

        setMem((prev)=>{
            return{...prev,[name]:value};
        })
    };
    
    const handleSave = async () => {
        setSaveLoading(false)
        try {
          // Update the expense on the server
          const response = await fetch(`/api/member/${mem.id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(mem), // Send updated details
          });
      
          if (!response.ok) {
            throw new Error('Failed to update expense');
          }
      
          const updatedMember = await response.json();
      
          setMemclData((prev) =>
            prev.map((item) => (item.id === updatedMember.id ? updatedMember : item))
          );
          navigate("/collectionAmount");
          setSaveLoading(true)
        } catch (error) {
          console.error("Error updating expense:", error);
          setSaveLoading(true)
        }
      };
      
      const handleDelete = async () => {
      
        setDelLoading(false);
        try {
    
          const response = await fetch(`/api/member/${mem.id}`, {
            method: "DELETE",
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete expense');
          }
      
          setMemclData((prev) => prev.filter((item) => item.id !== mem.id));
          setDelLoading(true)
          navigate("/addmembers");
      
        } catch (error) {
            setDelLoading(true)
          console.error("Error deleting expense:", error);
        }
      };

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
                     <button onClick={(e)=>handleSave(e)} disabled={!saveLoad ||!delLoading} style={{background:!saveLoad ||!delLoading?"#e5bdbd":"red"}}>{!saveLoad?"Saving...":<>Save <FaSave /></>  }</button>
                     <button onClick={(e)=>handleDelete(e) } disabled={!saveLoad ||!delLoading} style={{background:!saveLoad ||!delLoading?"#e5bdbd":"red"}}>{!delLoading?"Deleting...":<>Delete <MdDelete /></>  } </button>
                  </div>
                </div>
            ) : (
                <p>No member details available</p>
            )}
        </div>
    );
};

export default MemberDetails;

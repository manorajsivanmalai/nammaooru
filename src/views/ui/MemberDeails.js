import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import "../../assets/scss/adduser.css";
import { DataContext } from '../../contextapi/dataContextApi';
const MemberDetails = () => {
    const location = useLocation();
    const { member } = location.state || {};
    const {data,setData}=useContext(DataContext);
   
    return (
        <div className="member-details">
            <h1>Member Details</h1>
            {member ? (
                <div className='mem-detail'>
                    <div>
                        <label>ID:</label>
                        <input type="text" value={member.id} disabled />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={member.name}  />
                    </div>
                    <div>
                        <label>Amount:</label>
                        <input type="text" value={member.amount}  />
                    </div>
                    <div>
                      <label>Category:</label>
                         <select >
                          <option value={"-1"}>select</option>
                         </select>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="tel" placeholder="Enter phone number" />
                    </div>
                    <div>
                        <label>Address:</label>
                        <textarea placeholder="Enter address"></textarea>
                    </div>
                    <button>Save Changes</button>
                </div>
            ) : (
                <p>No member details available</p>
            )}
        </div>
    );
};

export default MemberDetails;

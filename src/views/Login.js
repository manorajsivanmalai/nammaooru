import { useState } from "react"
import "../assets/scss/adduser.css"

const Login = () => {
const [formdata,setFormdata]=useState({
    username:'',
    password:''
});
const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormdata((pre)=>{
        return {...pre,[name]:value}
    })
}
const handleSubmit=(e)=>{
    e.preventDefault();

    setFormdata({
        username:'',
        password:''
    })
}

    return (
        <div className="container login">
            <div className="login-container">
                <h1>Login</h1>
                <form id="loginForm" onSubmit={(e)=>handleSubmit(e)} method="post">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={formdata.username} required onChange={(e)=>handleChange(e)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formdata.password}  required onChange={(e)=>handleChange(e)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;
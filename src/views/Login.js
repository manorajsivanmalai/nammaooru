import { useContext, useEffect, useState } from "react"
import "../assets/scss/adduser.css"
import { UserContext } from "../contextapi/loginContextApi";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { setIslogin } = useContext(UserContext);
  const [errmsg, setErrmsg] = useState();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    username: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((pre) => {
      return { ...pre, [name]: value }
    })
    setErrmsg('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        if (response.status === 404) {
          const data = await response.json();
          setErrmsg(data.msg);
        } else {
          throw new Error("login failed");
        }

      } else {
        const data = await response.json();
        setIslogin(data.islogin);
        if (data.islogin) {
          navigate('/addmembers')
        }
      }

    } catch (error) {
      console.error('Error:', error);
      setIslogin(false);
    }
    setFormdata({
      username: '',
      password: '',
    });
  };

useEffect(()=>{
  setTimeout(() => {
    setErrmsg('');
  }, 5000);
},[errmsg])


  return (
    <div className="container login">
      <div className="login-container">
        <h1>Login</h1>
        <form id="loginForm" onSubmit={(e) => handleSubmit(e)} method="post">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formdata.username} required onChange={(e) => handleChange(e)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" autoComplete="" name="password" value={formdata.password} required onChange={(e) => handleChange(e)} />
          </div>
          <div style={{ color: "red" }}>
            {errmsg}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
export default Login;
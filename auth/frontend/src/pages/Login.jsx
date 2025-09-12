import React, { useState } from 'react';
import axios from '../lib/axios';
import useAuth from '../context/AuthContext';
import { useNavigate } from 'react-router';
const Login = () => {
  let {setToken}=useAuth()
  let navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        let res=await axios.post("/auth/login",{...formData})
        //store user info into localstorage
        setToken(res.data.token)
        //navigate to home
        navigate("/")
    }catch(error){
        console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;

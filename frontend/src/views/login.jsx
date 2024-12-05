import React, { useState, useContext } from 'react';
import { FaAppleAlt, FaUserAlt, FaLock, FaSignInAlt } from 'react-icons/fa'; 
import axios from 'axios';
import { notification } from 'antd';
import configData from "../../config/config.json";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../utils/AuthContext';
import { Link } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.email || !formData.password) {
      notification.error({
        message: 'Validation Error',
        description: 'Please fill in both email and password.',
      });
      return;
    }

    try {
     
      const response = await axios.post(`${configData.API_URL}/auth/login`, formData);
      
      
      notification.success({
        message: 'Login Successful',
        description: 'You have logged in successfully.',
      });

      
      login(response.data.token);

      
      navigate('/'); 

    } catch (error) {
      
      console.log(error); 

      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.error || 'An error occurred during login.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden p-8 border-2 border-yellow-400">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-900 flex items-center justify-center space-x-2">
            <span>Banana Mystery Challenge</span>
          </h1>
          <p className="text-lg text-yellow-700 mt-2">
            Welcome back! Log in to continue your banana adventure 🍌
          </p>
        </div>

        
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="flex items-center border-b-2 border-yellow-400 py-2">
            <FaUserAlt className="text-yellow-600 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-yellow-900 placeholder-yellow-500"
            />
          </div>

          
          <div className="flex items-center border-b-2 border-yellow-400 py-2">
            <FaLock className="text-yellow-600 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-yellow-900 placeholder-yellow-500"
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-2xl font-bold py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        </form>

        
        <div className="mt-6 text-center">
          <p className="text-yellow-700">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-yellow-900 font-semibold cursor-pointer">
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

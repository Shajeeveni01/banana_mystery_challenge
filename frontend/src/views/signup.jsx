import React, { useState } from 'react';
import { FaAppleAlt, FaUserAlt, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import { notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; 

import configData from "../../config/config.json";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; 

    setIsSubmitting(true); 

    try {
      const response = await axios.post(`${configData.API_URL}/auth/register`, formData);
      notification.success({
        message: 'Registration Successful',
        description: 'You have registered successfully. Please log in.',
      });
      navigate('/login');
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.response?.data?.error || 'An error occurred during registration.',
      });
    } finally {
      setIsSubmitting(false); 
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
            Join the fun! Sign up to start your banana adventure 🍌
          </p>
        </div>

        
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="flex items-center border-b-2 border-yellow-400 py-2">
            <FaUserAlt className="text-yellow-600 mr-2" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="bg-transparent outline-none w-full text-yellow-900 placeholder-yellow-500"
            />
          </div>

          
          <div className="flex items-center border-b-2 border-yellow-400 py-2">
            <FaEnvelope className="text-yellow-600 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-transparent outline-none w-full text-yellow-900 placeholder-yellow-500"
            />
          </div>

          
          <div className="flex items-center border-b-2 border-yellow-400 py-2">
            <FaLock className="text-yellow-600 mr-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-transparent outline-none w-full text-yellow-900 placeholder-yellow-500"
            />
          </div>

          
          <button
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
            className={`w-full ${isSubmitting ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'} text-white text-2xl font-bold py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-md`}
          >
            <FaUserPlus />
            <span>{isSubmitting ? 'Registering...' : 'Sign Up'}</span>
          </button>
        </form>

      
        <div className="mt-6 text-center">
        <p className="text-yellow-700">
            Already have an account?{' '}
            
            <Link to="/login" className="text-yellow-900 font-semibold cursor-pointer">
              Log in here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

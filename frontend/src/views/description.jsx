import React from 'react';
import { FaTrophy, FaHeart, FaClock, FaListAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Description = () => {
  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border-2 border-yellow-400">
        
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-yellow-900 flex items-center justify-center space-x-2">
            <span role="img" aria-label="banana" className="text-5xl">🍌</span> 
            <span>Welcome to the Banana Mystery Challenge!</span>
          </h1>
          <p className="text-lg text-yellow-700 mt-2">
            Sharpen your skills and uncover the secrets hidden within the Bananas! 
          </p>
        </div>

        
        <div className="text-yellow-900 text-lg leading-relaxed space-y-4">
          <p>
            In the <strong>Banana Mystery Challenge</strong>, you'll embark on a thrilling mathematical adventure filled with hidden equations and exciting challenges.
          </p>
          <div className="flex items-center space-x-3">
            <FaClock className="text-2xl text-yellow-500" />
            <p>Find hidden numbers within the tomatoes in just 30 seconds per equation.</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaHeart className="text-2xl text-yellow-500" />
            <p>Start with 3 hearts. Lose one if you run out of time or answer incorrectly!</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaTrophy className="text-2xl text-yellow-500" />
            <p>Compete for leaderboard spots by completing challenges with accuracy and speed.</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaListAlt className="text-2xl text-yellow-500" />
            <p>Embrace the challenge: Locate the hidden numbers before time runs out!</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaSignOutAlt className="text-2xl text-yellow-500" />
            <p>Need a break? Use the "Logout" option anytime from the navigation menu.</p>
          </div>
        </div>

        
        <div className="text-center mt-8">
          <Link to="/game"> 
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white text-2xl font-bold py-3 px-8 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-md">
              Start Your Adventure Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Description;

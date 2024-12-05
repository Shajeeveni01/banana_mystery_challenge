import React from 'react';
import { FaAppleAlt, FaPlay, FaTrophy, FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden p-8 border-2 border-yellow-400">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-900 flex items-center justify-center space-x-2">
            <span>Banana Mystery Challenge</span>
          </h1>
          <p className="text-lg text-yellow-700 mt-2">
            Are you ready to unlock the secrets of the jungle? 🍌
          </p>
        </div>

        
        <div className="bg-yellow-200 p-6 rounded-lg shadow-md text-center border-2 border-yellow-400 mb-6">
          <p className="text-yellow-900 text-xl font-semibold">
            Embark on a mysterious journey to find the golden bananas hidden within the jungle. Solve clues, avoid traps, and become the ultimate banana champion! 🏆
          </p>
        </div>

        
        <div className="flex flex-col items-center space-y-6">
          
          <div className="flex space-x-6">
            <FaTrophy className="text-5xl text-yellow-600 animate-pulse" aria-label="Trophy Icon" />
            <FaQuestionCircle className="text-5xl text-yellow-400 animate-spin" aria-label="Question Icon" />
          </div>

          
          <button
            onClick={handleStart} 
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-2xl font-bold py-3 px-8 rounded-full flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <FaPlay aria-hidden="true" />
            <span>Start the Adventure</span>
          </button>
        </div>

        
        <div className="mt-12 text-center">
          <p className="text-yellow-700">
            🍌 Are you the one to discover the hidden treasure? Join the challenge now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

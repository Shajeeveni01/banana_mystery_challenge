import React, { useContext } from 'react';
import { FaTrophy, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <header className="bg-yellow-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="banana" className="text-3xl animate-bounce">🍌</span>
          <h1 className="text-2xl font-bold text-white">
            Banana Mystery Challenge
        </div>

        <nav className="flex space-x-6">
          <Link to="/" className="text-lg font-semibold hover:text-yellow-700 transition duration-300">Home</Link>
          
          {isLoggedIn && (
            <Link to="/game" className="text-lg font-semibold hover:text-yellow-700 transition duration-300">Game</Link>
          )}
          
          <Link to="/leaderboard" className="text-lg font-semibold hover:text-yellow-700 transition duration-300">Leaderboard</Link>
          <Link to="/description" className="text-lg font-semibold hover:text-yellow-700 transition duration-300">Description</Link>

          {isLoggedIn && (
            <Link to="/profile" className="text-lg font-semibold hover:text-yellow-700 transition duration-300">Profile</Link>
          )}
          
          {!isLoggedIn && (
            <Link to="/login" className="text-lg font-semibold hover:text-yellow-700 transition duration-300">Login</Link>
          )}
          
          {!isLoggedIn && (
            <Link to="/signup" className="text-lg font-semibold hover:text-yellow-700 transition duration-300">Sign Up</Link>
          )}
          
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-lg font-semibold hover:text-yellow-700 transition duration-300"
            >
              Log Out
            </button>
          )}
        </nav>
      </div>

      <div className="bg-yellow-400 py-2 text-center text-yellow-900 font-semibold text-lg">
        🍌 Embark on a journey to become the ultimate Banana Champion! 🍌
      </div>
    </header>
  );
};

export default Header;

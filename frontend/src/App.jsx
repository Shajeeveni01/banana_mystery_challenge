import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Game from "./components/game";
import Home from "./views/Home";
import Header from "./components/header";
import Footer from "./components/footer";
import Logout from "./components/logout";
import Login from "./views/login";
import Signup from "./views/signup";
import Description from "./views/description";
import Profile from "./views/profile";
import Leaderboard from "./views/leaderboard";
import ProtectedRoute from "./utils/ProtectedRoute"; 

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") document.title = "Banana Game - Home";
    else if (path === "/game") document.title = "Banana Game - Play";
    else if (path === "/login") document.title = "Banana Game - Login";
    else if (path === "/signup") document.title = "Banana Game - Signup";
    else if (path === "/description") document.title = "Banana Game - Description";
    else if (path === "/profile") document.title = "Banana Game - Profile";
    else if (path === "/leaderboard") document.title = "Banana Game - Leaderboard";
    else if (path === "/logout") document.title = "Banana Game - Logout";
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <PageTitleUpdater /> 
      
      <div className="flex flex-col min-h-screen bg-yellow-100">
        <Header />

        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/game"
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/description" element={<Description />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<div>Page Not Found</div>} /> 
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

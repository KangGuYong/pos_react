// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"; // 홈 화면 스타일

const Home = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => navigate("/login");
  const navigateToRegister = () => navigate("/register");

  return (
    <div className="home-container">
      <h1>POS WEB</h1>
      <p>Select one of the following options.</p>
      <div className="button-group">
        <button className="nav-button" onClick={navigateToLogin}>
          Login
        </button>
        <button className="nav-button" onClick={navigateToRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;

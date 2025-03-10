// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"; // 홈 화면 스타일

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="home-container">
      <h1>POS WEB</h1>
      <p>로그인 또는 회원가입을 선택하세요.</p>
      <div className="button-group">
        <button className="nav-button" onClick={goToLogin}>
          로그인
        </button>
        <button className="nav-button" onClick={goToRegister}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Home;

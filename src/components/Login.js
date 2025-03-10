import React, { useState } from "react";
import { login } from "../service/authService";
import LoginForm from "./LoginForm";

const Login = () => {
  const [message, setMessage] = useState("");

  const handleLogin = async ({ userEmail, password }) => {
    try {
      const response = await login(userEmail, password);
      localStorage.setItem("authToken", response.data.token);
      setMessage("로그인 성공!");
    } catch (error) {
      setMessage("로그인 실패: " + (error.response?.data || "서버 오류"));
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <LoginForm onSubmit={handleLogin} />
      <p>{message}</p>
    </div>
  );
};

export default Login;

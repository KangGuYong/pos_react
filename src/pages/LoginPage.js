import React from "react";
import { login } from "../services/authService";
import LoginForm from "../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ posLoginId, posPassword }) => {
    try {
      await login(posLoginId, posPassword);
      navigate("/menu"); // 로그인 후 메뉴 페이지로 이동
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>POS 로그인</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;

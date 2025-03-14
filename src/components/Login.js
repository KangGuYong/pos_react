import React, { useState } from "react";
import { login } from "../service/authService";
import LoginForm from "./LoginForm";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async ({ posLoginId, posPassword }) => {
    console.log("📤 전송할 데이터:", { posLoginId, posPassword }); // 🔍 로그 추가

    try {
      const response = await fetch("http://localhost:8080/api/pos/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posLoginId, posPassword }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Login failed");
      }

      const { message } = await response.json();
      alert(message);
    } catch (error) {
      console.error("❌ 로그인 실패:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;

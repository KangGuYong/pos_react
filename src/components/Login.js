import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async ({ posLoginId, posPassword }) => {
    try {
      const response = await fetch("http://localhost:8080/api/pos/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posLoginId, posPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to login");
      }

      localStorage.setItem("posId", result.posId);
      localStorage.setItem("businessId", result.businessId);
      localStorage.setItem("businessType", result.businessType);

      navigate(`/menu/${result.posId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <LoginForm onSubmit={login} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;

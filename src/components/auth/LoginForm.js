import React, { useState } from "react";
import "../../css/LoginForm.css";

const LoginForm = ({ onSubmit }) => {
  const [posLoginId, setPosLoginId] = useState("");
  const [posPassword, setPosPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ posLoginId, posPassword });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이메일:</label>
          <input
            type="email"
            value={posLoginId}
            onChange={(e) => setPosLoginId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호:</label>
          <input
            type="password"
            value={posPassword}
            onChange={(e) => setPosPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;

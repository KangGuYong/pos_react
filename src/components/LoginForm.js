import React, { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [posLoginId, setPosLoginId] = useState(""); // ✅ 백엔드와 동일한 변수명 사용
  const [posPassword, setPosPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ posLoginId, posPassword }); // ✅ 백엔드에서 받을 변수명과 일치
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>이메일:</label>
        <input
          type="email"
          value={posLoginId} // ✅ 변경된 변수명 적용
          onChange={(e) => setPosLoginId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>비밀번호:</label>
        <input
          type="password"
          value={posPassword} // ✅ 변경된 변수명 적용
          onChange={(e) => setPosPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;

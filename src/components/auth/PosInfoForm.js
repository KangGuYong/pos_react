import React from "react";

const PosInfoForm = ({ posLoginId, setPosLoginId, password, setPassword }) => {
  return (
    <div>
      <div className="form-group">
        <label>이메일 (POS 로그인 ID):</label>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default PosInfoForm;

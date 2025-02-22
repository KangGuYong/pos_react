// src/components/UserRegister.js
import React, { useState } from "react";
import axios from "axios";
import "./UserRegister.css";

const UserRegister = () => {
  const [businessType, setBusinessType] = useState("Company");
  const [businessName, setBusinessName] = useState("");
  const [spon, setSpon] = useState(0);
  const [location, setLocation] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      business: {
        businessType,
        businessName,
        spon,
      },
      pos: {
        location,
        userEmail,
        password,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/pos/register",
        data
      );
      setMessage("유저 등록 성공!");
      console.log("Success:", response.data);
    } catch (error) {
      setMessage("유저 등록 실패: " + error.response.data);
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>유저 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>사업자 유형:</label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          >
            <option value="Company">Company</option>
            <option value="Individual">Individual</option>
          </select>
        </div>
        <div className="form-group">
          <label>사업장 이름:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>스폰:</label>
          <input
            type="number"
            value={spon}
            onChange={(e) => setSpon(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>위치:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>이메일:</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
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
        <button type="submit">등록하기</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UserRegister;

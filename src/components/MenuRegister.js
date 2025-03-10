// src/components/MenuRegister.js
import React, { useState } from "react";
import axios from "axios";
import "../css/MenuRegister.css";

const MenuRegister = () => {
  const [businessId, setBusinessId] = useState(""); // 연결할 사업장 ID
  const [menuName, setMenuName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [calories, setCalories] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [isDietFood, setIsDietFood] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      menuName,
      category,
      price,
      calories,
      ingredients,
      isDietFood,
      releaseDate,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/menu/register/${businessId}`,
        data
      );
      setMessage("메뉴 등록 성공!");
      console.log("Success:", response.data);
    } catch (error) {
      setMessage("메뉴 등록 실패: " + error.response.data);
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>메뉴 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>사업장 ID:</label>
          <input
            type="text"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>메뉴 이름:</label>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>카테고리:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>가격:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">등록하기</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default MenuRegister;

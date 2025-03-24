import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MenuRegisterPage = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState({
    name: "",
    category: "",
    price: 0,
    calorie: 0,
    ingredients: "",
    dietYn: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/menu/register/${businessId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(menuData),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { message } = await response.json();
      alert(message);
      navigate(`/menu/pos/${localStorage.getItem("posId")}`);
    } catch (error) {
      alert(`에러 발생: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenuData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <h2>메뉴 등록</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="메뉴 이름"
          value={menuData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="카테고리"
          value={menuData.category}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="가격"
          value={menuData.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="calorie"
          placeholder="칼로리"
          value={menuData.calorie}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="ingredients"
          placeholder="재료"
          value={menuData.ingredients}
          onChange={handleInputChange}
        />
        <label>
          다이어트용:
          <input
            type="checkbox"
            name="dietYn"
            checked={menuData.dietYn}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default MenuRegisterPage;

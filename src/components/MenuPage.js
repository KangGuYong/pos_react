import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/MenuRegister.css";

const MenuPage = () => {
  const { posId } = useParams();
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const businessType = localStorage.getItem("businessType");
  const businessId = localStorage.getItem("businessId");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/menu/list/${posId}`
        );
        if (!response.ok) {
          throw new Error("서버 응답 실패");
        }
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error("메뉴 가져오기 실패:", error);
      }
    };
    fetchMenus();
  }, [posId]);

  const handleMenuRegister = () => {
    navigate(`/menu/register/${businessId}`);
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">POS 시스템 - 메뉴 관리</h2>
      <h3 className="menu-subtitle">POS ID: {posId}</h3>

      {(businessType === "본점" || businessType === "개인") && (
        <div className="register-button-wrapper">
          <button className="register-button" onClick={handleMenuRegister}>
            메뉴 등록
          </button>
        </div>
      )}

      <div className="menu-grid">
        {menus.map((menu) => (
          <div key={menu.menuId} className="menu-card">
            <strong>{menu.menuName}</strong>
            <p>{menu.price}원</p>
            <button className="order-button">주문하기</button>
          </div>
        ))}
      </div>

      <div className="footer-buttons">
        <button className="footer-button">주문 내역</button>
        <button className="footer-button">결제하기</button>
        <button className="footer-button">뒤로가기</button>
      </div>
    </div>
  );
};

export default MenuPage;

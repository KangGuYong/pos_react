import React from "react";

const MenuList = ({ menuItems }) => {
  return (
    <ul>
      {menuItems.map((item, index) => (
        <li key={index}>
          {item.name} - {item.price}원
        </li>
      ))}
    </ul>
  );
};

export default MenuList;

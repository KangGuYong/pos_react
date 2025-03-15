import React from "react";
import { useMenu } from "../hooks/useMenu";
import MenuForm from "../components/menu/MenuForm";
import MenuList from "../components/menu/MenuList";

const MenuPage = () => {
  const { menuItems, addMenu } = useMenu();

  return (
    <div>
      <h2>POS 메뉴 관리</h2>
      <MenuForm onAdd={addMenu} />
      <MenuList menuItems={menuItems} />
    </div>
  );
};

export default MenuPage;

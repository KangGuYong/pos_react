import { useState, useEffect } from "react";
import { getMenuItems, addMenuItem } from "../services/menuService";

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await getMenuItems();
      setMenuItems(data);
    };
    fetchMenu();
  }, []);

  const addMenu = async (menuItem) => {
    const newItem = await addMenuItem(menuItem);
    setMenuItems([...menuItems, newItem]);
  };

  return { menuItems, addMenu };
};

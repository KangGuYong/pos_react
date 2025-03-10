// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserRegister from "./components/UserRegister";
import Login from "./components/Login";
import MenuRegister from "./components/MenuRegister";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-menu" element={<MenuRegister />} />
      </Routes>
    </Router>
  );
}

export default App;

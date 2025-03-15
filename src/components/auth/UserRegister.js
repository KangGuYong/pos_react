import React from "react";
import { useUserRegister } from "../../hooks/useUserRegister";
import { registerUser } from "../../services/userRegisterService";
import BusinessInfoForm from "./BusinessInfoForm";
import PosInfoForm from "../auth/PosInfoForm";
import AddressSearch from "./AddressSearch";

const UserRegister = () => {
  const state = useUserRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(state);
      state.setMessage(result.message);
    } catch (error) {
      state.setMessage("유저 등록 실패: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <BusinessInfoForm {...state} />
      <AddressSearch {...state} />
      <PosInfoForm {...state} />
      <button type="submit">등록하기</button>
    </form>
  );
};

export default UserRegister;

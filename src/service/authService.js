import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const login = async (userEmail, password) => {
  return axios.post(`${API_URL}/pos/login`, { userEmail, password });
};

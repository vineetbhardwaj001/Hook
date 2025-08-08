// src/utils/axiosAuth.js
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const axiosAuth = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    Authorization: user?.token ? `Bearer ${user.token}` : "",
  },
});

export default axiosAuth;

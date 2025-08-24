import axios from "axios";

const api = axios.create({
  baseURL: "https://hotels-bnys.onrender.com", 
});

export default api;

import axios from "axios";

const api = axios.create({

  baseURL: "https://fluxtube-pro-production.up.railway.app",
});

export default api;
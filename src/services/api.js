import axios from "axios";

const api = axios.create({

  baseURL: "https://fluxtube-api.onrender.com",
});

export default api;
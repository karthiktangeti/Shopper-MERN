import axios from "axios";

const api = axios.create({
  baseURL: "https://shopper-mern-24oy.onrender.com",
});

export default api;

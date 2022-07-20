import axios from "axios";

const api = axios.create({
  baseURL: "https://destoq.herokuapp.com",
});
export default api;

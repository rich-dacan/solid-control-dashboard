import axios from "axios";

const api = axios.create({
  baseURL: "https://solid-control-api.herokuapp.com/",
});
export default api;

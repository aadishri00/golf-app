import axios from "axios";

const API = axios.create({
  baseURL: "https://golf-app-47yt.onrender.com/api"
});

export default API;
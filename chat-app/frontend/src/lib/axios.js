import axios from "axios";

const instance = axios.create({
  baseURL: "https://node-eve.onrender.com/api",
});

export default instance;

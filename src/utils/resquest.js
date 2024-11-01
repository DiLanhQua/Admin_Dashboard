import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_ROOT;
const request = axios.create({
  baseURL,
  headers: {
    "auth-token": Cookies.get("accessToken"),
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
  return config;
});

const sendRequest = async (method, path, options = {}) => {
  const response = await request[method](path, options);
  return response.data;
};

export default sendRequest;

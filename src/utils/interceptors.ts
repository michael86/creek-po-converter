import axios from "axios";
import { readFromStorage, saveToStorage } from "./storage";

const apiUrl = process.env.REACT_APP_API_URL;

console.log(process.env.REACT_APP_API_URL);

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    token: readFromStorage("token") || "",
    email: readFromStorage("email") || "",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.token = readFromStorage("token") || "";
    config.headers.email = readFromStorage("email") || "";
    return config;
  },
  (error) => {
    console.error("error", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const token = response?.data?.token;
    if (token) {
      saveToStorage("token", token);
    }
    return response;
  },
  (error) => {
    console.error("error", error);
    return Promise.reject(error);
  }
);

export default instance;

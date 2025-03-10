import axios from "axios";

const ROOT = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

const api = axios.create({
  baseURL: ROOT,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

//Assign our logout handler to null at first, redux will assign this
let logoutHandler: (() => void) | null = null;

//Export a new function that allows redux to assign the above placeholder
export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    //Handle errors here and logout user if required

    //auth failed - 401
    if (error.response === 401) {
      logoutHandler && logoutHandler();
      return null;
    }
  }
);

export default api;

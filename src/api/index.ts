import axios from "axios";
import { validateErrorResponse } from "../utils/api";

const ROOT = import.meta.env.PROD
  ? `${import.meta.env.VITE_API_URL}`
  : `${import.meta.env.VITE_DEV_API_URL}:${import.meta.env.VITE_API_PORT}`;

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
  async (error: CustomAxiosError) => {
    // user error (status 4**)
    console.error("API error", error);
    if (error.status && error.status >= 400 && error.status < 500) {
      if (typeof error.response?.data?.message === "string") {
        if (!validateErrorResponse(error.response?.data?.message)) {
          logoutHandler && logoutHandler(); // add checks here later to prevent user logoiut if not required. I.e invalid pdf upload
        }

        return Promise.reject(error.response.data as CustomAxiosError);
      }
    }

    return Promise.reject(error as CustomAxiosError);
  }
);

export default api;

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
  async (error: CustomAxiosError) => {
    // If authentication failed (401)
    if (error.status === 401) {
      logoutHandler && logoutHandler();

      if (error.response?.data) {
        return Promise.reject(error.response.data as CustomAxiosError);
      }
    }

    //Something server side went wrong, check here later to see if status is 500, as may need to handle other errors above
    return Promise.reject(error);
  }
);

export default api;

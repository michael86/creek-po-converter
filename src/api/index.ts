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
    // user error (status 4**)
    if (error.status && error.status >= 400 && error.status < 500) {
      logoutHandler && logoutHandler(); // add checks here later to prevent user logoiut if not required. I.e invalid pdf upload

      if (error.response?.data) {
        return Promise.reject(error.response.data as CustomAxiosError);
      }
    }

    console.log("axios error", error);
    //Something server side went wrong, check here later to see if status is 500, as may need to handle other errors above
    return Promise.reject(error as CustomAxiosError);
  }
);

export default api;

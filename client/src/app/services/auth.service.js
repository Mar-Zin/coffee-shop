import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";

export const httpAuth = axios.create({
  baseURL: config.apiEndPoint + "/auth/",
  params: { key: "AIzaSyA5K02JA5efuPoOBLD1F-qA-tYv2_DhriA" },
});

const authService = {
  register: async (payload) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;

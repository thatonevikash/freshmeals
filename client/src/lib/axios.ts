import { getCookie } from "cookies-next";

import axios, { AxiosRequestConfig } from "axios";

import { CONFIG } from "@/config-global";

// -------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.site.serverUrl,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

// -------------------------------------------------------------

export const fetcher = async (
  ...args: [url: string, config?: AxiosRequestConfig]
) => {
  const [url, config] = args;

  const res = await axiosInstance.get(url, config);
  return res.data;
};

// -------------------------------------------------------------

export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  general: {
    meal: {
      root: "/meal",
      plate: "/meal/plate",
      collection: "/meal/collection",
      recent_ordered: "/meal/recent_ordered",
      most_ordered: {
        item: "/meal/most_ordered/item",
        plate: "/meal/most_ordered/plate",
      },
    },
    seller: {
      register: "/seller/register",
      unregister: "/seller/unregister",
    },
  },
};

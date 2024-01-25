import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();

    if (session && session.user.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/api/auth/signin?callbackUrl=/";
    }
    return Promise.reject(error);
  },
);

export { axiosInstance as axios };

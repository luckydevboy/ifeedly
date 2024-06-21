import { AxiosResponse } from "axios";

import { axios } from "@/app/api/axiosInstance";
import { User } from "@/app/lib/definitions";

export const getProfile = (): Promise<
  AxiosResponse<{ status: string; data: { user: User } }>
> => {
  return axios.get("/users/profile");
};

export const updateUser = (
  id: string,
  data: { username: string; name: string },
) => {
  return axios.put(`/users/${id}`, data);
};

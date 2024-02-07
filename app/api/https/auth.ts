import { axios } from "@/app/api/axiosInstance";
import { AxiosResponse } from "axios";
import { User } from "@/app/lib/definitions";

export const register = async (data: {
  username: string;
  password: string;
  name: string;
}): Promise<
  AxiosResponse<{ status: "success"; data: { user: User; token: string } }>
> => {
  return await axios.post("/auth/register", data);
};

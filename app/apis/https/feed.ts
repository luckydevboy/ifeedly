import { axios } from "../axiosInstance";
import { Post, Response } from "@/app/lib/definitions";
import { AxiosResponse } from "axios";

export async function getFeed({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<AxiosResponse<Response<Post[]>>> {
  return await axios.get("/feed", { params: { page, pageSize } });
}

export async function postFeed(content: string) {
  return await axios.post("/feed", { content });
}

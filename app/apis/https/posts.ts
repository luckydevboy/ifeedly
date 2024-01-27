import { axios } from "../axiosInstance";
import { Post, Response } from "@/app/lib/definitions";
import { AxiosResponse } from "axios";

export async function getPosts({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<AxiosResponse<Response<Post[]>>> {
  return await axios.get("/posts", { params: { page, pageSize } });
}

export async function createPost(content: string) {
  return await axios.post("/posts", { content });
}

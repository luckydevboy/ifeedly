import { axios } from "../axiosInstance";
import { Post } from "@/app/lib/definitions";
import { AxiosResponse } from "axios";

export async function getPosts({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<
  AxiosResponse<{ status: string; data: { total: number; posts: Post[] } }>
> {
  return await axios.get("/posts", { params: { page, pageSize } });
}

export async function createPost(content: string) {
  return await axios.post("/posts", { content });
}

export const likePost = async (id: string) => {
  return await axios.put(`/posts/like/${id}`);
};

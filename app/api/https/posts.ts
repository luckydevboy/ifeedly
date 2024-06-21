import { AxiosResponse } from "axios";

import { axios } from "../axiosInstance";
import { PostWithComments, PostWithCommentsCount } from "@/app/lib/definitions";

export async function getPosts({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<
  AxiosResponse<{
    status: string;
    data: { total: number; posts: PostWithCommentsCount[] };
  }>
> {
  return await axios.get("/posts", { params: { page, pageSize } });
}

export const getPost = async (
  id: string,
): Promise<
  AxiosResponse<{ status: string; data: { post: PostWithComments } }>
> => {
  return await axios.get(`posts/${id}`);
};

export async function createPost(content: string) {
  return await axios.post("/posts", { content });
}

export const likePost = async (id: string) => {
  return await axios.put(`/posts/like/${id}`);
};

export const createComment = async (postId: string, content: string) => {
  return await axios.post(`/posts/${postId}/comments`, { content });
};

import { axios } from "../axiosInstance";
import { Post } from "@/app/lib/definitions";
import { AxiosResponse } from "axios";

export async function getFeed(): Promise<AxiosResponse<Post[]>> {
  return await axios.get("/feed");
}

export async function postFeed(post: Omit<Post, "id" | "reactions">) {
  console.log({ content: post.content });
  return await axios.post("/feed", { content: post.content });
}

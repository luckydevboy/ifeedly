export type Post = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  reactions: {
    likes: number;
    isLiked?: boolean;
  };
  author: Pick<User, "username" | "name" | "image">;
};

export type User = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  name: string;
  image: string;
  role: string;
};

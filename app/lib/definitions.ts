export type CommonPost = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  author: Pick<User, "username" | "name" | "image">;
};

export interface PostWithComments extends CommonPost {
  reactions: {
    likes: number;
    comments: Comment[];
    isLiked?: boolean;
  };
}

export interface PostWithCommentsCount extends CommonPost {
  reactions: {
    likes: number;
    comments: number;
    isLiked?: boolean;
  };
}

export type Comment = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
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

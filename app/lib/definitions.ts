export type Post = {
  _id: string;
  updatedAt: string;
  content: string;
  reactions: {
    likes: number;
    isLiked?: boolean;
  };
  author: {
    username: string;
  };
};

export type Response<T> = {
  status: string;
  data: {
    items: T;
    currentPage: number;
    pageSize: number;
    total: number;
  };
};

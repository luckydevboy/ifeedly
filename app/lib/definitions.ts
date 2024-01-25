export type Post = {
  id: string;
  created_time: string;
  content: string;
  reactions: {
    likes: number;
    comments: number;
  };
  user: {
    id: string;
    username: string;
    name: string;
  };
};

export type Response<T> = {
  data: T;
  pageSize: number;
  currentPage: number;
  total: number;
};

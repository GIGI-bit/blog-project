export type Category = {
  id: number;
  name: string;
};

export type Blog = {
  id: number;
  created_at: string;
  title: string;
  body: string;
  thumbnail: string;
  authors: {
    email: string;
  } | null;
};

export type Author = {
  id: string;
  name: string;
};

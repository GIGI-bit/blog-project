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
    id: string;
    email: string;
  } | null;
  categories: {
    name: string;
  } | null;
};

export type Author = {
  id: string;
  name: string;
};

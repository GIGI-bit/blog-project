import { create } from "zustand";

interface PaginationState {
  blogs: any[];
  currentPage: number;
  visibleBlogsCount: number;
  addBlogs: (newBlogs: any[]) => void;
  setCurrentPage: (page: number) => void;
  setVisibleBlogsCount: (count: number) => void;
  resetBlogs: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  blogs: [],
  currentPage: 1,
  visibleBlogsCount: 10,
  addBlogs: (newBlogs) =>
    set((state) => ({ blogs: [...state.blogs, ...newBlogs] })),
  setCurrentPage: (page) => set({ currentPage: page }),
  setVisibleBlogsCount: (count) => set({ visibleBlogsCount: count }),
  resetBlogs: () => set({ blogs: [] }),
}));

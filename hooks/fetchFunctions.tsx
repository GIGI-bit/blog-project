"use client";

// import { useLocation } from "react-router-dom";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, Blog } from "@/types/CustomTypes";
import { createClient } from "@/utils/supabase/client";
import { usePaginationStore } from "@/store/usePaginationStore";
import { toast } from "react-toastify";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      }
    };
    getCategories();
  }, []);

  return { categories };
};

export const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/blogs?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch Blogs");

        const data = await res.json();
        setBlogs(data);
      } catch (err: any) {
        console.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, [page]);

  return { blogs, loading };
};

export const useFetchBlogById = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) if (!res.ok) throw new Error("Failed to fetch Blogs");

        const data = await res.json();
        setBlogs(data);
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      }
    };
    getBlogs();
  }, []);

  return { blogs };
};

export const useCurrentUserId = () => {
  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    const getUserId = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user?.id);
      }
    };
    getUserId();
  }, []);
  return userId;
};

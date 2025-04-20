import { useEffect, useState } from "react";
import { Category } from "@/types/CustomTypes";
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

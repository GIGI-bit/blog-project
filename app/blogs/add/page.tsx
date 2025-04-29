"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ToastContainer, toast } from "react-toastify";
import { Category } from "@/types/CustomTypes";

const WriteBlog = () => {
  const router = useRouter();
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        imgLink,
        text,
        category_id: selectedCategory,
      }),
    });
    response.ok
      ? toast.success("Blog Added Successfully!!")
      : toast.warn("Failed to add blog!!");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:3000/api/categories`);
      if (!response) console.error("Couldn't fetch categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
      }
    };
    checkAuth();
  }, [router, supabase]);
  return (
    <div className="w-full items-center">
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          placeholder="Enter Title..."
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 w-fit p-2 my-2 rounded-xl"
        />
        <label htmlFor="category" className="text-sm font-medium">
          Select a Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleChange}
          required
          className="w-fit border border-gray-300 rounded-md p-2 my-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <label htmlFor="link">Image Link</label>
        <input
          id="link"
          name="link"
          onChange={(e) => setImgLink(e.target.value)}
          placeholder="Enter Link..."
          required
          className="border border-gray-300 w-fit p-2 my-2 rounded-xl"
        />
        <label htmlFor="description">Text</label>
        <textarea
          id="description"
          rows={6}
          onChange={(e) => setText(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write your text here..."
        ></textarea>
        <button
          type="submit"
          className="p-3 border border-[#FFD050] bg-[#FFD050] mt-4 rounded-m"
        >
          Submit
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default WriteBlog;

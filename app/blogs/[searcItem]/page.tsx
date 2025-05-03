"use client";
import { useState, useEffect } from "react";
import { Blog } from "@/types/CustomTypes";
import { useRouter, useParams } from "next/navigation";
import CustomLoader from "@/components/loader";

const SearchedBlogs = () => {
  const router = useRouter();
  const param = useParams();
  const searcItem = (param.searcItem ?? "") as string;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `/api/blogs/filter?title=${encodeURIComponent(searcItem)}&page=1`
        );
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (searcItem) {
      fetchBlogs();
    }
  }, [searcItem]);

  if (loading) {
    return <CustomLoader></CustomLoader>;
  }

  return !blogs || !blogs.length ? (
    <div className="flex flex-col items-center gap-5">
      <div className="border border-gray-200 bg-gray-200 flex-inline w-fit p-5 rounded-xl">
        <p> No Available Blogs!</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-5">
      <section className="grid grid-cols-1 mt-[8vh] sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog: Blog) => (
          <div
            key={blog.id}
            onClick={() => router.push(`/blogs/details/${blog.id}`)}
            className="border relative h-[50vh] rounded-xl p-4 shadow hover:shadow-lg transition duration-300 "
          >
            {blog?.thumbnail ? (
              <img
                src={blog.thumbnail}
                alt="Featured fallback"
                className=" h-[25vh] object-cover inset-0 rounded-xl"
              />
            ) : (
              <div className="w-full h-[25vh] bg-gray-300 rounded-md" />
            )}
            <div
              className="w-fit px-2 py-1 rounded-[5px] my-4 "
              style={{ backgroundColor: "rgba(75, 107, 251, 0.05)" }}
            >
              <p className="text-[#4B6BFB] text-xs">{blog?.categories?.name}</p>
            </div>
            <h3 className="text-xl h-[10vh] font-semibold mt-4">
              {blog?.title?.length > 65
                ? blog.title?.slice(0, 65) + "..."
                : blog?.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              by {blog.authors?.email || "Unknown"}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SearchedBlogs;

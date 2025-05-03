"use client";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { Blog } from "@/types/CustomTypes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteButton from "@/components/delete-blog-button";
import CustomLoader from "@/components/loader";

interface AuthorDetailPageProps {
  params: { id: string };
}

const AuthorsBlogs = ({ params }: AuthorDetailPageProps) => {
  const supabase = createClient();
  const param = useParams<{ id: string }>();
  const { id } = param;
  if (!id) {
    return <div>No Author ID Provided</div>;
  }
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  //   const res = await fetch(`http://localhost:3000/api/authors/${id}`);
  //   const blogs = await res.json();
  //   console.log(blogs);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsCurrentUser(user?.id === id);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/authors/${id}`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  if (loading) {
    return <CustomLoader></CustomLoader>;
  }

  if (!blogs || blogs.length === 0) {
    return <div>No Blogs Found</div>;
  }

  return !blogs || !blogs.length ? (
    <div className="flex flex-col items-center gap-5">
      <div className="border border-gray-200 bg-gray-200 flex-inline w-fit p-5 rounded-xl">
        <p> {blogs ? blogs[0]?.authors?.email : "Author was not found"}</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-5">
      <div className="border border-gray-200 bg-gray-200 flex-inline w-fit p-5 rounded-xl">
        <p> {blogs ? blogs[0]?.authors?.email : "Author was not found"}</p>
      </div>
      <section className="grid grid-cols-1 mt-[8vh] sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog: Blog) => (
          <div
            key={blog.id}
            onClick={() => {
              isHovered
                ? router.refresh()
                : router.push(`/blogs/details/${blog.id}`);
            }}
            className="border relative h-[50vh] rounded-xl p-4 shadow hover:shadow-lg transition duration-300 "
            onMouseEnter={() => isCurrentUser && setIsHovered(true)}
            onMouseLeave={() => isCurrentUser && setIsHovered(false)}
          >
            {isHovered && (
              <div className="border absolute h-[45vh] w-[18vw] bg-gray-300 opacity-75 rounded-xl flex justify-center shadow hover:shadow-lg transition duration-300 ">
                <DeleteButton id={blog.id}></DeleteButton>
              </div>
            )}
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

export default AuthorsBlogs;

"use client";
import Image from "next/image";
import { useFetchBlogs } from "@/hooks/fetchFunctions";

const isTrustedDomain = (url: string | undefined) => {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    return ["upload.wikimedia.org"].includes(hostname);
  } catch {
    return false;
  }
};

export default function HomePage() {
  const { blogs } = useFetchBlogs();
  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);
  const isValidImage = isTrustedDomain(featuredBlog?.thumbnail);
  return (
    <div className="w-full">
      <section className="relative  w-full h-[35vh] rounded-xl shadow-lg p-6">
        {featuredBlog?.thumbnail ? (
          isValidImage ? (
            <Image
              src={featuredBlog.thumbnail}
              alt="Featured"
              fill
              className="rounded-xl object-cover"
            />
          ) : (
            <img
              src={featuredBlog.thumbnail}
              alt="Featured fallback"
              className="w-[1vw] h-[5vh] object-cover inset-0 rounded-xl"
            />
          )
        ) : (
          <div className="absolute inset-0 bg-gray-800 rounded-xl" />
        )}
        <div className="absolute rounded-xl inset-0 bg-black/40 text-white p-6 flex flex-col justify-end">
          <div
            className="w-fit px-2 py-1 rounded-[5px] mb-3"
            style={{ backgroundColor: "rgba(75, 107, 251, 1)" }}
          >
            <p className="text-white text-xs">Category</p>
          </div>
          <h2 className="text-3xl font-bold">{featuredBlog?.title}</h2>
          <div className="flex mt-[5px] gap-3">
            <p className="text-[12px]">{featuredBlog?.authors?.email}</p>
            <p className="text-[12px]">
              {new Date(featuredBlog?.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 mt-[8vh] sm:grid-cols-2 md:grid-cols-3 gap-6">
        {otherBlogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition duration-300 "
          >
            {blog?.thumbnail ? (
              isTrustedDomain(blog.thumbnail) ? (
                <Image
                  src={blog.thumbnail}
                  alt="Featured"
                  // fill
                  // className="rounded-xl object-cover"
                />
              ) : (
                <img
                  src={blog.thumbnail}
                  alt="Featured fallback"
                  // className="w-[1vw] h-[5vh] object-cover inset-0 rounded-xl"
                />
              )
            ) : (
              <div className="w-full h-[180px] bg-gray-300 rounded-md" />
            )}
            {/* {isTrustedDomain(blog.thumbnail) && blog.thumbnail ? (
              <Image
                src={blog.thumbnail}
                alt="Thumbnail"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-[180px]"
              />
            ) : (
              <div className="w-full h-[180px] bg-gray-300 rounded-md" />
            )} */}
            <h3 className="text-xl font-semibold mt-4">{blog.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              by {blog.authors?.email || "Unknown"}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

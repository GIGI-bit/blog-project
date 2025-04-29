"use client";
import Image from "next/image";
import { useFetchBlogs } from "@/hooks/fetchFunctions";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePaginationStore } from "@/store/usePaginationStore";
import { useMemo } from "react";

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
  const { blogs, visibleBlogsCount, setVisibleBlogsCount } =
    usePaginationStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const filteredBlogs = useMemo(() => {
    if (!category) return blogs;
    return blogs.filter((blog) => blog.categories?.name === category);
  }, [category, blogs]);
  const featuredBlog = filteredBlogs[0];
  const otherBlogs = filteredBlogs.slice(1, visibleBlogsCount);
  const isValidImage = featuredBlog
    ? isTrustedDomain(featuredBlog.thumbnail)
    : false;

  useFetchBlogs();

  const handleShowMore = () => {
    setVisibleBlogsCount(visibleBlogsCount + 3);
  };

  const handleShowLess = () => {
    setVisibleBlogsCount(visibleBlogsCount - 3);
  };

  return filteredBlogs ? (
    <div className="w-full">
      <section className="relative  w-full h-[45vh] rounded-xl shadow-lg">
        {featuredBlog?.thumbnail ? (
          isValidImage ? (
            <div className="relative h-[35vh] w-full">
              <Image
                src={featuredBlog.thumbnail}
                alt="Featured"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          ) : (
            <img
              src={featuredBlog.thumbnail}
              alt="Featured fallback"
              className="w-full h-full object-cover inset-0 rounded-xl"
            />
          )
        ) : (
          <div className="absolute inset-0 bg-gray-800 rounded-xl" />
        )}
        <div className="absolute rounded-xl inset-0 bg-black-400 text-white p-6 flex flex-col justify-end">
          <div
            className="w-fit px-2 py-1 rounded-[5px] mb-3"
            style={{ backgroundColor: "rgba(75, 107, 251, 1)" }}
          >
            <p className="text-white text-xs">
              {featuredBlog?.categories?.name}
            </p>
          </div>
          <h2 className="text-3xl font-bold">
            {featuredBlog?.title.length > 30
              ? featuredBlog?.title.slice(0, 30) + "..."
              : featuredBlog?.title}
          </h2>
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
            onClick={() => router.push(`/blogs/details/${blog.id}`)}
            className="border h-[50vh] rounded-xl p-4 shadow hover:shadow-lg transition duration-300 "
          >
            {blog?.thumbnail ? (
              isTrustedDomain(blog.thumbnail) ? (
                <div className="relative h-[25vh] w-[18vw]">
                  <Image
                    src={blog.thumbnail}
                    alt="Featured"
                    fill
                    className="rounded-xl object-cover "
                  />
                </div>
              ) : (
                <img
                  src={blog.thumbnail}
                  alt="Featured fallback"
                  className=" h-[25vh] w-[18vw] object-cover inset-0 rounded-xl"
                />
              )
            ) : (
              <div className="w-[18vw] h-[25vh] bg-gray-300 rounded-md" />
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
      <div className="mt-4 flex gap-4">
        {visibleBlogsCount < blogs.length && (
          <button onClick={handleShowMore} className="btn btn-primary">
            Show More
          </button>
        )}
        {visibleBlogsCount > 10 && (
          <button onClick={handleShowLess} className="btn btn-secondary">
            Show Less
          </button>
        )}
      </div>
    </div>
  ) : (
    <div>
      <h1>No Available Blog To Show!</h1>
    </div>
  );
}

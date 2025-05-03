// import { useParams } from "next/navigation";
import CustomLoader from "@/components/loader";
import Link from "next/link";

interface BlogDetailPageProps {
  params: { id: string };
}

const BlogDetail = async ({ params }: BlogDetailPageProps) => {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/blogs/${id}`);

  if (!res.ok) {
    return <CustomLoader></CustomLoader>;
  }

  const blog = await res.json();
  return (
    <div className="flex flex-col items-left gap-5">
      <div
        className="w-fit px-2 py-1 rounded-[5px] my-2"
        style={{ backgroundColor: "#4B6BFB" }}
      >
        <p className="text-white text-xs">{blog?.categories?.name}</p>
      </div>
      <h1 className="font-bold text-2xl">{blog.title}</h1>
      <div className="flex mt-[5px] gap-3 items-center">
        <Link
          href={`/authors/${blog?.authors?.id}`}
          className="text-sm text-gray-500 mt-1"
        >
          by {blog.authors?.email || "Unknown"}
        </Link>
        <p className="text-sm text-gray-500 pt-[5px]">
          {new Date(blog?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <img
        src={blog.thumbnail}
        alt="Featured fallback"
        className="w-full h-[50vh] object-cover inset-0 rounded-xl"
      />
      <div dangerouslySetInnerHTML={{ __html: blog.body || "" }}></div>
    </div>
  );
};

export default BlogDetail;

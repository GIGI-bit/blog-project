"use client";
import { useCurrentUserId } from "@/hooks/fetchFunctions";
import Link from "next/link";

const CustomLink = () => {
  const userId = useCurrentUserId();
  return (
    <Link
      href={`/authors/${userId}`}
      className="text-gray-600  dark:text-[#BABABF]"
    >
      My Blogs
    </Link>
  );
};

export default CustomLink;

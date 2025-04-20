"use client";
import { useFetchCategories } from "@/hooks/fetchFunctions";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const { categories } = useFetchCategories();

  return (
    <div className="flex flex-col gap-2 text-left">
      <h3 className="text-black font-medium mb-2">Categories</h3>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/?category=${cat.name}`}
          className="text-gray-600 hover:underline"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;

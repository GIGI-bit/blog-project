"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchComponent = () => {
  const [searchItem, setSearchItem] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchItem.trim()) {
      router.push(`/blogs/${searchItem.trim()}`);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="border border-black-700 rounded-l"
      >
        <input
          className="w-[10vw] pl-1"
          placeholder="Enter title..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <button
          type="submit"
          className="border border-black-700 rounded-l p-1 bg-gray-100"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;

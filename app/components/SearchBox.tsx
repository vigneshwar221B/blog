"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.results));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setResults([]);
      }
    };

    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      {/* Search Icon Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-3 text-2xl sm:text-3xl transition-transform duration-200 hover:scale-125"
        aria-label="Open search"
      >
        <FaSearch />
      </button>

      {/* Overlay Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            ref={boxRef}
            className="bg-white rounded-sm w-full max-w-lg p-2 dark:bg-black"
          >
            {/* Search Input */}
            <input
              className="w-full p-2 bg-white text-black dark:bg-black dark:text-white outline-none focus:ring-0 focus:outline-none"
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
            />

            {/* Results */}
            {results.length > 0 && (
              <ul className="mt-2 shadow overflow-hidden">
                {results.map((post) => (
                  <Link
                    key={post._id}
                    href={`/posts/${post.slug.current}`}
                    onClick={() => setOpen(false)}
                  >
                    <li className="p-2 hover:bg-[#ff8a65] hover:text-[#fff] cursor-pointer">
                      {post.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
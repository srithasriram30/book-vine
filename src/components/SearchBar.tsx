'use client'
import React from 'react'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, XIcon, Loader2 } from "lucide-react";
import type { BookPreview } from "@/types/Book";

const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [results, setResults] = useState<BookPreview[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          if (query.trim()) {
            performSearch(query);
          } else {
            setResults([]);
          }
        }, 300);
    
        return () => clearTimeout(timer);
      }, [query]);
    
      async function performSearch(query: string) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/books?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setResults(data.slice(0, 5)); // Show top 5 results
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      }
    
      function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
          setResults([]); // Clear results after navigation
        }
      }
       
  return (
    <div className="relative w-full max-w-md">
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsTyping(e.target.value.length > 0);
        }}
        placeholder="Search for books..."
        className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setResults([]);
          }}
          className="absolute inset-y-0 right-10 pr-3 flex items-center"
        >
          <XIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
      {isLoading && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        </div>
      )}
    </form>

    {/* Dropdown results */}
    {isTyping && results.length > 0 && (
      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-96">
        {results.map((book) => (
          <div
            key={book._id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
            onClick={() => {
              router.push(`/books/${book._id}`);
              setResults([]);
            }}
          >
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="w-8 h-10 object-cover mr-3"
              />
            )}
            <div>
              <p className="font-medium truncate">{book.title}</p>
              <p className="text-xs text-gray-500">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default SearchBar
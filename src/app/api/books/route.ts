// src/app/api/books/route.ts
import { NextResponse } from "next/server";
import type { Book } from "@/types/Book";

type OpenLibraryDoc = {
    key: string;
    cover_edition_key?: string;
    title: string;
    author_name?: string[];
  };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const data = await res.json();

 

  const books: Book[] = data.docs.slice(0, 10).map((doc: OpenLibraryDoc) => ({
    _id: doc.key.replace("/works/", ""),
    olid: doc.cover_edition_key || "",
    title: doc.title,
    author: doc.author_name?.[0] || "Unknown",
    coverUrl: doc.cover_edition_key 
      ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`
      : undefined,
  }));

  return NextResponse.json(books);
}
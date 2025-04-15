'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { Book } from '@/types/Book';
import BookCard from '@/components/book/BookCard';

const page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get("q") || "";

    const [isLoading, setIsLoading] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            setErrorMessage('');
            try {
                const response = await fetch(`/api/books?q=${encodeURIComponent(query)}`);
                if(!response.ok) {
                    throw new Error('Failed to fet books, please try again later')
                }

                const data = await response.json();
                const books  = data.slice(0,15)
                setBookList(books);
            } catch (error) {
                console.log(error);
                setErrorMessage('Failed to fetch books, please try again later');
            } finally {
                setIsLoading(false);
                setErrorMessage('');
            }
        }
        if (query.trim()) {
            fetchBooks()
          } else {
            setBookList([])
          }
    }, [query] )

    return (
        <>
            {isLoading && <p className='text-center'>Loading...</p>}

            {errorMessage && <p>{errorMessage}</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {bookList.map((book: Book) => (
                    <div key={book._id}>
                        <BookCard  {...book} />
                    </div>
                ))}
            </div>
        </>
    )

}

export default page
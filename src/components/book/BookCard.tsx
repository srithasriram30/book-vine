import { BookPreview } from '@/types/Book'
import Link from 'next/link'
// import Image from 'next/image'
import React from 'react'


const BookCard = (book: BookPreview) => {
  return (
    <div className='flex flex-col items-center justify-center p-4 border rounded-lg shadow-md'>
        {/* <Image src={book.coverUrl} alt={book.title} width={100} height={250}/> */}
        <h1>
          <Link href={`/books/${book._id}`}> {book.title}
          </Link>
          </h1>
        <p>{book.author}</p>
    </div>
  )
}

export default BookCard
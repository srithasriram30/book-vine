import { BookPreview } from '@/types/Book'
import Image from 'next/image'
import React from 'react'


const BookCard = (book: BookPreview) => {
  return (
    <div className='flex flex-col items-center justify-center p-4 border rounded-lg shadow-md'>
        <Image src={book.coverUrl} alt={book.title} width={100} height={250}/>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
    </div>
  )
}

export default BookCard
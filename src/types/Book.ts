export interface Book {
    _id: string,
    olid: DOMStringList,
    title: string,
    author: string,
    authors? : string[],
    coverUrl?: string,
    pages?: number,
    publishedYear?: number,
    genres?: string[],
    description?: string,
}

export type BookPreview = Pick<Book, "_id" | "olid" | "title" | "author" | "coverUrl">;
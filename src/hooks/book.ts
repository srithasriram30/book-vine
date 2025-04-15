export const getBookDetails = async (id: string) => {
    const res = await fetch(`https://openlibrary.org/works/${id}.json`)
    if(!res.ok){
        return {book: [], error: 'Failed to fetch book details', success:false}
    }

    const data = await res.json()
    return {book: data, error: '', success: true}
}

export const getAuthorName = async (authorKey: string) => {
    const res = await fetch(`https://openlibrary.org/authors/${authorKey}.json`)
    if(!res.ok){
        return {author: [], error: 'Failed to fetch author details', success:false}
    }

    const data = await res.json()
    return {author: data, error: '', success: true}
}
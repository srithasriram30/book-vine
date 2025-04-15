export interface Review {
    id: string;
    bookId: string;
    userId: string;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Review {
    id: string;
    bookId: string;
    userEmail: string;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}
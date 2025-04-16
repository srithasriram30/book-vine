export interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface AddReviewForm {
    rating: number;
    review: string;
}
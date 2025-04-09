export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type PublicUser = Pick<User, "_id" | "username" | "image">;

export interface UserInput {
    name: string;
    email: string;
    password?: string;    // Only for email/password auth
  }
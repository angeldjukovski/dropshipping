import { Book } from "./book.interface";

export interface WishLsit {
    _id: string;
    sub: string;
    bookID: Book;
}
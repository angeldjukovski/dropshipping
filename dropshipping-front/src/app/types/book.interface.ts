import { Cover } from "./cover.enum";

export interface Book {
  id:string;
  title:string;
  author:string;
  publishedDate : string;
  bestSeller:boolean
  discount: boolean;
  cover:Cover;
  price: number;
  description :string
  genre:string
  image :string
}

export interface BookGenre {
name:string,
path:string,
items? : BookGenre[]
}  


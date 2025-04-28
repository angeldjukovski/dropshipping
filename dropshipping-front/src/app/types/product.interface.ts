import { Status } from "./status.enum";





export interface Product {
    _id: string;
    userId :string;
        items: {
            book: string;
            quantity: number;
            title: string;
            price : number;
            author : string;
            image : string; 
        }[];
        title:string;
        totalPrice: number;
        status: Status;
    }
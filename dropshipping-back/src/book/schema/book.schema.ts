import { Schema } from "mongoose";
import { Cover } from "./book.enum";
export const BookSchema = new Schema(
{
title:{type:String, required:true},
author: {type:String,required:true},
publishedDate: {type:String, required:true},
bestSeller: {type:Boolean, required:true},
discount: {type:Boolean,required:true},
cover : {type:String, enum:['hardcover', 'paperback'],required:true},
price: {type:Number,required:true},
description: {type:String, required:true},
genre: {type:String,required:true},
image: {type:String, required:true}
},
{toJSON: {virtuals:true}, toObject : {virtuals: true}}
);


BookSchema.virtual('id').get(function() {
return this._id.toHexString()
})


export interface BookBack {
id:string,
title:string;
author:string;
publishedDate:string;
bestSeller:boolean;
discount:boolean;
cover:Cover;
price: number;
description:string;
genre:string;
image:string;
}




export interface BookDocument extends BookBack, Document {}
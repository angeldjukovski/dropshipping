import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps:true})

export class Product extends Document  {

@Prop({required : true, type : Array})
items : {book:string; quantity: number}[]

@Prop({required : true})
totalPrice : number 

@Prop({default : 'prending'})
status : string

}

export const ProductSchema = SchemaFactory.createForClass(Product)
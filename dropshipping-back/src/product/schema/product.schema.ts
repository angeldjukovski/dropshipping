import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CartItemsDTO } from "product/dto/cart-items.dto";
import { UserRole } from "user/schema/user-role.enum";

@Schema({timestamps:true})

export class Product extends Document  {

@Prop({required : true, type : Array})
items : {book:CartItemsDTO}[]

@Prop({required : true})
totalPrice : number 

@Prop({enum : ['paid','taken','delivered', 'pending'],default : 'pending'})
status : string 

@Prop({required: true})
userId : string

@Prop({required : false,  ref: 'users'})
assignedTo : string

@Prop({enum : ['Unassigned','Assigned'], default: 'Unassigned'})
assignmentStatus: 'Unassigned' | 'Assigned';
}



export const ProductSchema = SchemaFactory.createForClass(Product)
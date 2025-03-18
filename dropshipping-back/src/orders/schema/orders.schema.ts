import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { Types } from "mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})

export class Orders extends Document {

@Prop({type: String, ref : 'users', required: true}) 
sub: string 

@Prop({type: Types.ObjectId, ref : 'users', required: true, autopopulate: true}) 
userID: Types.ObjectId

@Prop({type: Types.ObjectId, ref : 'book', required: true, autopopulate: true}) 
bookID: Types.ObjectId 

@Prop({type: Types.ObjectId, ref : 'delivery', required: true, autopopulate: true}) 
deliveryID: Types.ObjectId 


}
export const OrdersSchema = SchemaFactory.createForClass(Orders)
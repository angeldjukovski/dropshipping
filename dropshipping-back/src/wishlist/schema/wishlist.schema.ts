import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Types } from 'mongoose'

@Schema({timestamps:true})

export class WishList extends Document  {

@Prop({type: String, ref : 'users', required: true}) 
sub: string

@Prop({type: Types.ObjectId, ref : 'book', required: true, autopopulate: true}) 
bookID: Types.ObjectId 

}

export const WishListSchema = SchemaFactory.createForClass(WishList)
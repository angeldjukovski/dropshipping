import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Orders } from './schema/orders.schema';
import { ObjectId } from 'typeorm';



@Injectable()
export class OrdersService {

constructor(@InjectModel('orders') private orderModel : Model <Orders>) {}

async getOrderData(userIdentity:string) : Promise <Orders[]>  {
const orders = await this.orderModel 
.find({sub:userIdentity})
.populate('bookID','userID','deliveryID')
.exec()
return orders
}

async deleteOrderData(sub:string,bookID : string, userID : string, deliveryID : string): Promise  <void>  {
await this.orderModel.deleteOne({sub,bookID,userID,deliveryID})
}

async createOrderData(sub:string,bookID : string, userID : string, deliveryID : string): Promise <Orders>  {
const orderList = new this.orderModel ({
sub,
bookID : new Types.ObjectId(bookID),
userID :  new Types.ObjectId(userID),
deliveryID :  new Types.ObjectId(deliveryID),
})
return orderList.save()
}

}

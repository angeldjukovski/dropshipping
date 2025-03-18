import { Controller,Get,Param,Delete,Body,Post,Req,UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { OrdersService } from './orders.service';
import { Orders } from './schema/orders.schema';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {

constructor( private ordersService : OrdersService)  {}   

@Get()  
async getOrderData(@Req() req):Promise <Orders[]>  {
const userIdentity = req.user.sub 
console.log(`getting orderData: ${userIdentity}`)
const orders = await this.ordersService.getOrderData(userIdentity)
console.log('Very Nice')
return orders

}

@Delete()
async removeOrder(@Req() req, @Body() body : {bookID : string, userID : string, deliveryID : string})  {
const userIdentity = req.userIdentity.sub 
return this.ordersService.deleteOrderData(userIdentity,body.bookID, body.userID, body.deliveryID )
}

@Post()
async addBook(@Req() req , @Body() body : {bookID : string , userID : string, deliveryID : string})  {
const userIdentity = req.userIdentity.sub 
const result = await this.ordersService.createOrderData(userIdentity, body.bookID, body.userID, body.deliveryID)
return result 
}

}

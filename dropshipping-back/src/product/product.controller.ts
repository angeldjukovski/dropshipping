import { Controller,Post,Body,UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { PaymentService } from 'payment/payment.service';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { GetUser } from 'common/decorator/current-user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class ProductController {
constructor (private paymentService : PaymentService, private productService : ProductService )  {}  

@Post()
async checkout (@GetUser() user: any,@Body() body : {cartItems: any[]; totalPrice : number; token : string})  {
const userId = user.sub
const {cartItems, totalPrice, token} = body

const charge = await this.paymentService.createCharge(token,totalPrice)

if(!charge || charge.status !== 'succeeded')  {
throw new Error('The Payment is unsuccessful ')
}
return this.productService.createProduct(cartItems, totalPrice, userId, charge.id)
}

}

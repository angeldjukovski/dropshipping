import { Controller,Post,Body,UseGuards,Get,UnauthorizedException,Logger,HttpException, HttpStatus, Delete, Patch, Param, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { PaymentService } from 'payment/payment.service';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { GetUser } from 'common/decorator/current-user.decorator';
import { Role} from 'common/decorator/role.decorator.decorator'; 
import { RolesGuard } from 'common/guard/role.guard';
import { Product } from './schema/product.schema';
import { CartItemsDTO } from './dto/cart-items.dto';
import { CheckoutDTO } from './dto/checkout.dto';
import { UserRole } from 'user/schema/user-role.enum';
import { RoleValidatorType } from 'common/type/role.validator.enum';
import { EditProductsDTO } from './dto/edit_products.dto';


@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
private readonly logger = new Logger('ProductController')
constructor (private paymentService : PaymentService, private productService : ProductService )  {}  

@Post()
async checkout (@GetUser() user: any,@Body() body : CheckoutDTO)  {
console.log('Checkout Request', body)
const userId = user.sub
const {cartItems,totalPrice, token} = body
try {
const charge = await this.paymentService.createCharge(token, 'usd', totalPrice)
if(!charge) {
throw new  HttpException('Payment Error', HttpStatus.BAD_REQUEST)
}
if(charge.status !== 'succeeded')  {
throw new Error('The Payment is unsuccessful')
}
console.log('Saving Proudcts' ,{
cartItems, totalPrice, userId, charge
})



return this.productService.createProduct(cartItems, totalPrice, userId, charge.id)
}catch (error) {
this.logger.error(`Payment Failed From User: ${userId} with error: ${error.message}`)
throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
}
}

@Get('') 
async getProdcutUser (@GetUser() user) : Promise <Product[]> {
const userId = user.sub
if (!userId) {
throw new UnauthorizedException("User not authenticated");
}
console.log(`getting delivery of user: ${userId}`)
return this.productService.getProduct(userId)
}


@Get('/orders-lists')
@Role([UserRole.Admin],RoleValidatorType.HasAllOfThese) 
async getAllProducts() : Promise  <Product[]> {
return this.productService.getAllProducts()
}

@Delete('/:id') 
@Role([UserRole.Admin, UserRole.Customer],RoleValidatorType.HasSomeOfThese)
async deleteProduct(@Param('id')   id : string) : Promise <Product | null> {
return this.productService.deleteProduct(id)
}

@Patch('/:id')
@Role([UserRole.Admin, UserRole.Employee],RoleValidatorType.HasSomeOfThese)  
async updateProduct(@Param('id') id : string, @Body() body) : Promise <Product>  {
return this.productService.updateProduct(id, body)
}

@Patch('assign/:id')
assignOrder(@Param('id') id : string, @Body('employeeId') employeeId: string, @Body('assignmentStatus') assignmentStatus : 'Unassigned'| 'Assigned') {
return this.productService.assignOrder(id,employeeId,assignmentStatus)
}

@Patch('status/:id')
@Role([UserRole.Employee],RoleValidatorType.HasAllOfThese)  
updateOrderStatus(@Param ('id') id : string, @Req() req: any, @Body('status') status : 'taken' | 'delivered' ) {
return this.productService.updateOrderStatus(id,req.user.id,status)
}

@Get('/:id') 
getOrder (@GetUser() user : any): Promise <Product[]>  {
const employeeId = user.sub
return this.productService.getOrder(employeeId)
}

}

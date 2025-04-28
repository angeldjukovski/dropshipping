import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Product, ProductSchema } from './schema/product.schema';
import { CartItemsDTO } from './dto/cart-items.dto';
import { EditProductsDTO } from './dto/edit_products.dto';
import { BookDocument } from 'book/schema/book.schema';


@Injectable()
export class ProductService {

constructor(@InjectModel('product') private productModel : Model<Product>)  {}

async createProduct(cartItems: CartItemsDTO[], totalPrice: number,userId:string, chargeId:string) {
    const product = new this.productModel({
        items: cartItems.map((item) => ({
            book: item.book._id,
            quantity: item.quantity,
            title: item.book.title,
            price : item.book.price,
        })),
        totalPrice: totalPrice,
        assignedTo : 'Unassigned',
        status : 'pending',
        assignmentStatus : 'Unassigned',
        userId,
        chargeId,
        createdAt: new Date(),
    });
    return await product.save();
}


async getProduct(userId: string): Promise<Product[]> {
    const products = await this.productModel.find({ userId }).exec();

    console.log(`Product Data of ${userId} : `, products);
    return products;
}

async getAllProducts (): Promise  <Product[]> {
const products = this.productModel.find().exec() 
return products
}

async deleteProduct(id : string): Promise <Product | null> {
const products = this.productModel.findByIdAndDelete(id) 
return products 
}

async updateProduct (userId : string, body: EditProductsDTO  )  {
const updateProduct = await this.productModel.findOneAndUpdate({userId},body, {new:true}).exec() 
return updateProduct
}

async assignOrder(orderId : string, employeeId : string, assignmentStatus: 'Unassigned' | 'Assigned') : Promise <Product> {
return this.productModel.findByIdAndUpdate({_id : orderId}, { assignedTo : employeeId, assignmentStatus }, {new:true}).exec()
}

async updateOrderStatus (orderId : string, userId : string, status : 'taken' | 'delivered')  {
const product = await this.productModel.findOneAndUpdate({_id : orderId}, {assignedTo : userId}, {new:true}).exec() 
if(!product) throw new Error('order not found');
product.status = status 
return product.save()
}

async getOrder(employeeId : string)  {
console.log(`Order Checking from get order in the service`, employeeId)
const orders = await this.productModel.find({assignedTo : employeeId}).exec() 
console.log('orders check:', orders);
return orders;

}

}

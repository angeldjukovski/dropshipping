import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Product, ProductSchema } from './schema/product.schema';

@Injectable()
export class ProductService {

constructor(@InjectModel('product') private productModel : Model<Product>)  {}


async createProduct(cartItems: any[], totalPrice: number,userId:string, chargeId:string) {
    const product = new this.productModel({
        items: cartItems.map((item) => ({
            book: item.book._id,
            quantity: item.quantity
        })),
        totalPrice: totalPrice,
        status : 'paid',
        userId,
        chargeId,
        createdAt: new Date(),
    });
    return await product.save();
}



}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { PaymentService } from 'payment/payment.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schema/product.schema';


@Module({
imports : [MongooseModule.forFeature([{name: 'product', schema: ProductSchema }])],
controllers: [ProductController],
providers: [ProductService,PaymentService]
})

export class ProductModule {}

import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookSchema } from "./schema/book.schema";
import { BookController } from "./book.controller";
import { ProductController } from "product/product.controller";
import { ProductService } from "product/product.service";
import { ProductSchema } from "product/schema/product.schema";
import { PaymentService } from "payment/payment.service";

@Module ({
imports : [
MongooseModule.forFeature([{name:'book',schema: BookSchema}, {name:'product', schema: ProductSchema}]),
],
controllers: [BookController,ProductController],
providers: [BookService,ProductService,PaymentService],
exports :  [BookService],
})

export class FictionModule {}
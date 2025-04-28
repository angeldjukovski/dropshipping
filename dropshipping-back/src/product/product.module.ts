import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { PaymentService } from 'payment/payment.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schema/product.schema';
import { FictionModule } from 'book/fiction.module';
import { BookSchema } from 'book/schema/book.schema';
import { BookController } from 'book/book.controller';
import { BookService } from 'book/book.service';


@Module({
imports : [MongooseModule.forFeature([{name: 'product', schema: ProductSchema }])],
controllers: [ProductController],
providers: [ProductService,PaymentService]
})

export class ProductModule {}

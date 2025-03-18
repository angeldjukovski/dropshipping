import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookSchema } from "./schema/book.schema";
import { BookController } from "./book.controller";

@Module ({
imports : [
MongooseModule.forFeature([{name:'book',schema: BookSchema}]),
],
controllers: [BookController],
providers: [BookService],
exports :  [BookService],
})

export class FictionModule {}
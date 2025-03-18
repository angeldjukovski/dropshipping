import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { BookDetailsController } from "./book-details.controller";
import { BookDetailsService } from "./book-details.service";
import { BookSchema } from "../book/schema/book.schema";

@Module ({
imports : [
MongooseModule.forFeature([{name:'book-db',schema: BookSchema}]),
],
controllers: [BookDetailsController],
providers: [BookDetailsService],
exports :  [BookDetailsService],
})

export class BookDetailsModule {}

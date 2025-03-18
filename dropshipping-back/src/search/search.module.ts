import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { BookSchema } from "book/schema/book.schema";

@Module ({
imports : [
MongooseModule.forFeature([{name:'book',schema: BookSchema}]),
],
controllers: [SearchController],
providers: [SearchService],
exports :  [SearchService],
})

export class SearchModule {}
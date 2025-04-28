import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument } from './schema/book.schema';
import { Product, ProductSchema } from 'product/schema/product.schema';
import { CreateBookDTO } from './dto/book.dto';
import { Model } from 'mongoose';
import { UpdateBookDTO } from './dto/updatebook.dto';

import { Types } from 'mongoose';

@Injectable()
export class BookService {
constructor(@InjectModel('book') private bookModel:Model<BookDocument>, @InjectModel('product') private productModel : Model <Product> ) {
console.log('itworks it works:', bookModel.modelName);
}

async getBooks():Promise <BookDocument[]>  {
console.log("Finder,Finder")
const books = this.bookModel.find().exec()
console.log('test', books)
return books 
}
async getBooksByGenre(genre: string): Promise<BookDocument[]> {
return await this.bookModel.find({ genre }).exec();
}
async getBook(id: string): Promise<BookDocument> {
    console.log('get ID', id, 'Type:', typeof id);

    if (!Types.ObjectId.isValid(id)) {
        console.error(`Invalid ObjectId: ${id}`);
        throw new Error(`Invalid ObjectId: ${id}`);
    }

    const objectId = new Types.ObjectId(id);
    console.log('Converted to ObjectId:', objectId);

    const book = await this.bookModel.findById(objectId).exec(); 
    
    console.log('Found Book:', book);
    return book;
}




/*async getRandomBooks(count : number): Promise <BookDocument[]> {
return await this.bookModel.aggregate([{$sample:{size:count}}])
}*/
async getBestSeller(bestSeller:boolean, limit:number, limitPerGenre = 1):Promise<BookDocument[]> {
const genres  = await this.bookModel.distinct('genre', {bestSeller}) 

const facetPipeline = [
     {
        $facet : genres.reduce((book,genre) => {
        book[genre] = [{$match : {bestSeller : true,genre}}, { $sample : {size : limitPerGenre} } ] ;
        return book
        }, {})
     },
     {
        $project : {
        allBooks : {
        $reduce  : {
        input : {$objectToArray: "$$ROOT"}, 
        initialValue : [],
        in: { $concatArrays: ["$$value", "$$this.v"] }
        }
        }
        }
     },
     { $unwind: "$allBooks" },
     { $replaceRoot: { newRoot: "$allBooks" } },
     { $sample : {size : limit} }
    ];
    const result = await this.bookModel.aggregate(facetPipeline).exec() 
    return result 
}


async getBestBargain(bestSeller: boolean , discount: boolean, limit:number, limitPerGenre = 1):Promise<BookDocument[]> {
const genres = await this.bookModel.distinct('genre', {bestSeller}, {discount})

const facetPipeline = [

    {
        $facet : genres.reduce((book,genre) => {
        book[genre] = [{$match : {bestSeller : true,genre}}, {$sample : {size :limitPerGenre}} ] ;
        return book
        }, {} as Record<string, any[]>)
     },
     {
        $project : {
        allBooks : {
        $reduce  : {
        input : {$objectToArray: "$$ROOT"}, 
        initialValue : [],
        in: { $concatArrays: ["$$value", "$$this.v"] }
        }
        }
        }
     },
     { $unwind: "$allBooks" },
     { $replaceRoot: { newRoot: "$allBooks" } },
     { $sample: {size : limit } }

];
const result = await this.bookModel.aggregate(facetPipeline).exec() 
    return result 

}

async getTrendingBooks(limit =  5) : Promise <BookDocument[]>  {
    const trending = await this.productModel.aggregate ([
    {$unwind : '$items'},
    {$group : {_id : '$items.book', totalSold : {$sum : '$items.quantity'}}},
    {$sort : {totalSold : -1}},
    {$limit : limit}
    ]).exec()
    const bookIDs = trending.map(trending => trending._id) 
    return this.bookModel.find({_id : {$in : bookIDs}}).exec()
    }


async createBook(body:CreateBookDTO):Promise<BookDocument> {
const newBook =  new this.bookModel(body)
console.log('create new book',newBook)
return await newBook.save()
}
async updateBook ( id:string,body:UpdateBookDTO):Promise<BookDocument> {
const updateBook = await this.bookModel.findByIdAndUpdate(id,body, {new:true}).exec()
return updateBook
}
async deleteBook(id:string):Promise<BookDocument | null>  {
const deleteBook = await this.bookModel.findByIdAndDelete(id).exec()
return deleteBook
}
}
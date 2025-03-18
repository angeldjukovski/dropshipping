import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument } from './schema/book.schema';
import { CreateBookDTO } from './dto/book.dto';
import { Model } from 'mongoose';
import { UpdateBookDTO } from './dto/updatebook.dto';
import { Types } from 'mongoose';

@Injectable()
export class BookService {
constructor(@InjectModel('book') private bookModel:Model<BookDocument>) {
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
async getBestSeller(bestSeller:boolean, limit:number):Promise<BookDocument[]> {
return await this.bookModel.find({bestSeller}).limit(limit).exec()
}
async getBestBargain(bestSeller: boolean , discount: boolean,limit:number):Promise<BookDocument[]> {
return await this.bookModel.find({bestSeller,discount}).limit(limit).exec()
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
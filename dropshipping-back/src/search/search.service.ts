import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchBookDTO } from './dto/search.dto';
import { BookDocument } from 'book/schema/book.schema';

@Injectable()
export class SearchService {
  constructor(@InjectModel('book') private readonly bookModel: Model<BookDocument>) {}

  async searchBooks(searchBooksDTO: SearchBookDTO): Promise<BookDocument[]> {
  const {genre,query} = searchBooksDTO
  const search = new RegExp (query, "i")

  return await this.bookModel.find({...(genre && {genre}), $or: [{ title: search },{ author: search }, { description: search },] }).exec()

    
  }
}
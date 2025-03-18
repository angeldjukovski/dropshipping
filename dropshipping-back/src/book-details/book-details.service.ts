import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDocument } from 'book/schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { ObjectId } from 'typeorm';
import { Types } from 'mongoose';

@Injectable()
export class BookDetailsService {
constructor(@InjectModel('book') private bookModel:Model<BookDocument>) {}

async getBookDetails(id: string): Promise<BookDocument> {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException('Invalid book id');
  }

  const book = await this.bookModel.findById(id).exec();
  if (!book) {
    throw new NotFoundException('Book not found');
  }
  return book;
}

}
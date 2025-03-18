import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

describe('BookController', () => {
  let bookController: BookController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    bookController = app.get<BookController>(BookController);
  });


});

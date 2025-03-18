import { Test, TestingModule } from '@nestjs/testing';
import { BookDetailsController } from './book-details.controller';

describe('BookDetailsController', () => {
  let controller: BookDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookDetailsController],
    }).compile();

    controller = module.get<BookDetailsController>(BookDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

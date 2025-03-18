import { Controller,Get,Param } from '@nestjs/common';
import { BookDocument } from 'book/schema/book.schema';
import { BookDetailsService } from './book-details.service';

@Controller('book-details')
export class BookDetailsController {

constructor( private bookDetails : BookDetailsService) {}

@Get('/:id')
getBookDetails(@Param('id') id:string):Promise<BookDocument> {
return this.bookDetails.getBookDetails(id)
}

}

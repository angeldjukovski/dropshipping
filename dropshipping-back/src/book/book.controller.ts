import { Body, Controller,Delete,Get,Param,Post,Put,Query,UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/book.dto';
import { UpdateBookDTO } from './dto/updatebook.dto';
import { BookDocument } from './schema/book.schema';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { Types } from 'mongoose';

@Controller('book-db')
@UseGuards(JwtAuthGuard)
export class BookController {
constructor(private readonly bookService:BookService)  {

}
@Get('/')
getBooks():Promise <BookDocument[]> {
console.log('test from controller')
return this.bookService.getBooks()
}
@Get('/genre/:genre')
getBooksByGenre(@Param('genre') genre: string): Promise<BookDocument[]> {
return this.bookService.getBooksByGenre(genre);
}
@Get('/book/:id')
getBook(@Param('id') id:string):Promise<BookDocument> {
console.log('Getting book by id:', id)

if(!Types.ObjectId.isValid(id)) {
throw new Error(`wrong ObjectID: ${id}`)
}

return this.bookService.getBook(id)
}
@Get('/:bestseller')
getBestSeller(@Query('bestSeller') bestSeller: string): Promise<BookDocument[]> {
const isBestSeller = bestSeller === 'true';
return this.bookService.getBestSeller(isBestSeller,5);
}
@Get('/:bargains')
getBestBargain(@Query('bestSeller',) @Query('discount') bestSeller: string, discount:string): Promise<BookDocument[]> {
const isBestSeller = bestSeller === 'true';
const isDiscount = discount === 'true'
return this.bookService.getBestSeller(isBestSeller && isDiscount,5);
}
/*@Get('/')
async getRandomBooksEndpoint(@Query('count') count: number = 5): Promise<BookDocument[]> {
return await this.bookService.getRandomBooks(count);
}*/
@Post('/')
createBook(@Body() body:CreateBookDTO):Promise<BookDocument> {
return this.bookService.createBook(body)
}
@Put('/:id')
updateBook(@Param('id') id:string, @Body() body:UpdateBookDTO):Promise<BookDocument> {
if(!Types.ObjectId.isValid(id)) {
throw new Error(`wrong ObjectID: ${id}`)
 }      
return this.bookService.updateBook(id,body)
}
@Delete('/:id')
deleteBook(@Param('id') id: string): Promise<BookDocument | null> {
if(!Types.ObjectId.isValid(id)) {
throw new Error(`wrong ObjectID: ${id}`)
}        
return this.bookService.deleteBook(id);
}
}

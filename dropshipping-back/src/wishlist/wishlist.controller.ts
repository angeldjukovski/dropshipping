import { Controller,Get,Param,Delete,Body,Post,Req,UseGuards} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { WishList } from './schema/wishlist.schema';


@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {

constructor(private wishListBookService : WishlistService) {}

@Get()
async getBook(@Req() req):Promise<WishList[]> {
const userId = req.user.sub
console.log(`getting books for user: ${userId}`)
const wishlist = await this.wishListBookService.getWishListBook(userId)
console.log(`Very Nice`)
return wishlist
}

@Delete()
async removeFromWishlist(@Req() req, @Body() body: { bookID: string }){
const userId = req.user.sub
return this.wishListBookService.deleteWishListBook(userId,body.bookID);
}

@Post()
async addBook(@Req() req, @Body() body : {bookID : string}) {
const userId = req.user.sub
console.log(`Adding Books ${body.bookID} to wishlist for user : ${userId} `)
if(!body.bookID || body.bookID.length < 24)  {
console.error('invalid book ID', body.bookID)
throw new Error(`Wrong Book ID: ${body.bookID}`)

}

const result = await this.wishListBookService.addBookWishList(userId, body.bookID)
console.log('Add result',result)
return result
}

}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import {  BookDocument,} from 'book/schema/book.schema';
import { Types } from 'mongoose';
import { WishList } from './schema/wishlist.schema';



@Injectable()
export class WishlistService {

constructor(@InjectModel('wishlists') private wishlistModel : Model<WishList>)   {}


async getWishListBook(userId:string):Promise <WishList[]> {
const wishlistModel = await this.wishlistModel
.find({sub :userId})
.populate('bookID')
.exec()
console.log('Wishlist Data:', wishlistModel)
return wishlistModel
}

async deleteWishListBook(sub:string, bookID:string):Promise<void>  {
console.log('Deleting book from wishlist')
await this.wishlistModel.deleteOne({sub, bookID})
}

async addBookWishList (sub : string, bookID : string): Promise<WishList> {
console.log('Adding book to wishlist', {sub, bookID})
const wishlistItem = new this.wishlistModel ({
sub,
bookID: new Types.ObjectId(bookID),
})
return wishlistItem.save()
}

}
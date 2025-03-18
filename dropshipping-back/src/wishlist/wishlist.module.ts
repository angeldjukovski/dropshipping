import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'book/schema/book.schema';
import { WishListSchema } from './schema/wishlist.schema';

@Module({
  imports : [
  MongooseModule.forFeature([{name:'wishlists',schema: WishListSchema}]),
  ],

  providers: [WishlistService],
  controllers: [WishlistController]
})
export class WishlistModule {}

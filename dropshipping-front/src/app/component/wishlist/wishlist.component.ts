import { Component } from '@angular/core';
import { Book } from '../../types/book.interface';
import { WishlistService } from '../shared/wishlist.service';
import { MatCardModule, MatCardImage } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { WishLsit } from '../../types/wishlist.interface';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatCardImage,MatButtonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
wishListBook : WishLsit[] = [] 
books : Book[] = []

constructor( private wishListService : WishlistService, private authService : AuthService, private cartService : CartService) {}

ngOnInit (): void {
this.loadWishList()
}

loadWishList(): void {
  this.wishListService.getWishList().subscribe({
    next: (books) => {
      this.wishListBook = books;},
    error: (err) => console.error('Failed to fetch wishlist', err),
  });
}

deleteFromWishList(bookId:string) : void  {
if(confirm ('Do you wish to delete this book')) {
this.wishListService.deleteBook(bookId).subscribe ({
next : () =>  {
  this.loadWishList()
},
error : err => {
console.error('Error deleting book from wishlist:', err);
}
})
}
}

addToCart(book : Book) {
const addToCart = this.cartService.addBooks(book) 
return addToCart
}

}
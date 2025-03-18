import { Component } from '@angular/core';
import { Book } from '../../types/book.interface';
import { WishlistService } from '../shared/wishlist.service';
import { MatCardModule, MatCardImage } from '@angular/material/card';
import { Observable } from 'rxjs';
import { get } from 'http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { WishLsit } from '../../types/wishlist.interface';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatCardImage],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
wishListBook : WishLsit[] = []

constructor( private wishListService : WishlistService, private authService : AuthService) {}

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

deleteFromWishList(bookID:string) : void  {
this.wishListService.deleteBook(bookID).subscribe ({
next: () => {
this.wishListBook = this.wishListBook.filter((book) => book.id !== bookID)
},
error: (err) => console.error('Failed to remove book from wishlist', err),  
})
}

}
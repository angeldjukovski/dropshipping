import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../types/book.interface';
import {MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../shared/wishlist.service';
import { CartService } from '../shared/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
book: Book | null = null 
isLoggedIn = computed(() => this.authService.isAuth())
constructor(private cartService : CartService, private wishListService : WishlistService, private snackBar : MatSnackBar, private authService : AuthService)  {}

ngOnInit(): void {
const storedBook = localStorage.getItem('selectedBook') 
if(storedBook) {
this.book = JSON.parse(storedBook)
}
}

addToCart(book:Book) : void {
  if(this.isLoggedIn()) {
  this.cartService.addBooks(book)
  this.snackBar.open(`${book.title} is added to the cart`, 'Close', {duration : 3000, verticalPosition :'top', horizontalPosition: 'center', panelClass :['snack-bar-sucess']})
  } else {
  console.error('Error')
  this.snackBar.open(`You have to have an account in order to purchase this book`, 'Close', {duration : 3000, verticalPosition :'top', horizontalPosition: 'center', panelClass :['snack-bar-faliure']})
  }
}
  
  addWishListBook(book:Book) : void {
  const bookID = book.id || (book as any)._id
  if(!bookID) {
  console.error('BOOK ID is missing')
  }
  this.wishListService.addWishListBook(bookID).subscribe ({
  next : () => {
  this.snackBar.open(`${book.title} is added to your wishlist`, 'Close', {duration : 3000, verticalPosition :'top', horizontalPosition: 'center', panelClass :['snack-bar-sucess']})
  },
  error : (err) => {
    this.snackBar.open(`You have to have an account in order to add this book to your wishlsit`, 'Close', {duration : 3000, verticalPosition :'top', horizontalPosition: 'center', panelClass :['snack-bar-faliure']})
  }
  })

  }  


}
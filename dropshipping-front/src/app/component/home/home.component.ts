import { Component, Input, computed, OnInit } from '@angular/core';
import { Book } from '../../types/book.interface';
import { CartService } from '../shared/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Route, Router } from '@angular/router';
import { BookServiceService } from '../book-service.service';
import { SearchComponent } from "../search/search.component";
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../shared/wishlist.service';
import { PaymentService } from '../shared/payment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule,MatSnackBarModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
@Input() book!: Book
books: Book[] = []
trendingBooks : Book[] = [] 
randomBooks : Book[] = []
bestSelling : Book[] = []
bestBargain : Book [] = []
isLoggedIn = computed(() => this.authService.isAuth())


constructor( private cartService : CartService, private router:Router, private bookService: BookServiceService, private wishListService : WishlistService, private snackBar : MatSnackBar, private authService : AuthService ) { }

ngOnInit(): void {
this.bookService.getTrendingBooks().subscribe((books : Book[]) => {
this.trendingBooks = books;
console.log('Trending Books:', books);
})

this.bookService.getBestSeller(true).subscribe((books: Book[]) => {
  this.bestSelling = books;
});

this.bookService.getBestBargain(true,true).subscribe((books:Book[]) => {
this.bestBargain = books
})

}

loadDeafultBooks(): void {
if(this.books.length === 0) {
this.trendingBooks = this.getRandomBooks(this.books,5)
}
}
private getRandomBooks(books: Book[], count: number): Book[] {
const stuffed = [...books].sort(() => Math.random() - 0.5)
return stuffed.slice(0,count)
}


  viewDetails(book:Book) : void {
  const bookID = book.id || (book as any). _id 
  localStorage.setItem('selectedBook',JSON.stringify(book))
  this.router.navigate(['book-details',bookID]);
  return 
  }
  
 
  addBooks(book:Book) : void {
    if(this.isLoggedIn()){
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
import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../types/book.interface';
import { CartService } from '../shared/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Route, Router } from '@angular/router';
import { BookServiceService } from '../book-service.service';
import { SearchComponent } from "../search/search.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, ],
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


constructor( private cartService : CartService, private router:Router, private bookService: BookServiceService ) { }

ngOnInit(): void {
this.trendingBooks = this.cartService.getTrendingBooks()
console.log('Trending Books:', this.trendingBooks);
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
addBooks(book:Book) : void {
  this.cartService.addBooks(book)
  }

  viewDetails(book:Book) : void {
  localStorage.setItem('selectedBook',JSON.stringify(book))
  this.router.navigate(['book-details',book.id]);
  }
  

}
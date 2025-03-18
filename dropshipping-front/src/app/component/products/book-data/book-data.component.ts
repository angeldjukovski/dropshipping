import { Component,OnInit,Input, ViewChild  } from '@angular/core';
import {Router,ActivatedRoute } from '@angular/router';
import { BookGenre } from '../../../types/book.interface';
import { CommonModule } from '@angular/common';
import { Book } from '../../../types/book.interface';
import { BookServiceService } from '../../book-service.service';
import { CartService } from '../../shared/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardContent, MatCardImage, MatCardModule, } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Filter } from '../../../types/filter.interface';
import { Sort } from '../../../types/sort.enum';
import { PaginationComponent } from "../../pagination/pagination.component";
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../shared/wishlist.service';

@Component({
  selector: 'app-book-data',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatPaginatorModule, PaginationComponent,MatIconModule],
  templateUrl: './book-data.component.html',
  styleUrl: './book-data.component.scss'
})
export class BookDataComponent implements OnInit {
@Input() book!: Book
books: Book[] = []
userId : string = ''
allBooks: Book[] = []
id: string = ''
genre: string = ''
page : number = 1
limit: number = 10
totalPages: number = 0
sort : Sort = Sort.Asc
constructor(private router:Router,private route:ActivatedRoute, private bookService: BookServiceService, private cartService: CartService, private http: HttpClient, private wishListService : WishlistService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data
      this.allBooks = data
      })
      this.route.paramMap.subscribe((param) => {
      this.genre = param.get('genre') || '';
      this.loadData();
      this.loadBooksByGenre(this.genre)
      }) 
      
  }
  addBooks(book:Book) : void {
  this.cartService.addBooks(book)
  }
  addWishListBook(book:Book) : void {
  const bookID = book.id || (book as any)._id
  if(!bookID) {
  console.error('BOOK ID is missing')
  }
  this.wishListService.addWishListBook(bookID).subscribe ({
  next : () => {
  console.log(`${book.title} added to wishlist`)
  },
  error : (err) => {
  console.error('Error adding book to wishlist', err);
  }
  })

  }


  viewDetails(book:Book) : void {
  localStorage.setItem('selectedBook',JSON.stringify(book))
  this.router.navigate(['book-details',book.id]);
  }

  loadBooksByGenre(genre:string):void {
    const bookObservable = genre
    ? this.bookService.getBooksByGenre(genre)
    : this.bookService.getBooks();

  bookObservable.subscribe({
    next: (data) => {
      this.books = data;
      this.allBooks = data;
    },
    error: (err) => console.error('Error load by genre is not working', err)
  });
  }
  navigator(path:string): void {
    this.router.navigate([path] )
    }

    onSearch(query:string): void {
    this.books = this.allBooks.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    }

    onPageChange(event: {page:number; pageSize : number; sort:Sort}) : void {
      console.log(`IS CHANGE WORKING  ${this.page}, ${this.limit}`);
    this.page = event.page
    this.limit = event.pageSize
    this.sort = event.sort
    this.loadData()
    }
    
    changeSort(order:Sort): void {
    this.sort = order
    this.page = 1
    this.loadData()
    }
   

    loadData(): void {
      console.log(`IS IT WORKING LOAD DATA ???: ${this.genre}, PAGE: ${this.page}, LIMIT: ${this.limit}`);
      this.bookService.movePage(this.genre,this.page , this.limit, this.sort ).subscribe({
        next: (response: {books: Book[]; total:number}) => {
          this.books = response.books
          this.totalPages = Math.ceil(response.total / this.limit);
        },
        error: (err) => {
          console.error('Pagination is not working', err);
          alert(`Pagination is not working ${err.message}`);
        }
      });
    }
  }

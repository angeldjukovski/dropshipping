import { CommonModule } from '@angular/common';
import { Component,ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../types/user.interface';
import { Book } from '../../types/book.interface';
import { BookServiceService } from '../book-service.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Cover } from '../../types/cover.enum';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { response } from 'express';


@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatButton, MatFormFieldModule, MatPaginatorModule,MatIcon,MatSelectModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

username : string = ''
dataSource = new MatTableDataSource<Book>();
user: User | null = null; 
displayColums :  string[] = [ 'title', 'author', 'publishedDate', 'bestSeller', 'discount', 'cover', 'price', 'genre', 'actions']
page : number = 1
limit: number = 20
totalPages: number = 0
books: Book[] = []
bookForm! : FormGroup;
constructor( private authService : AuthService, private router : Router, private bookService :BookServiceService, private formBuilder : FormBuilder) {}

editRowId: string | null = null;
editedBook: Partial<Book> = {};

elementsForm() : void {
this.bookForm = this.formBuilder.group ({
title : ['', Validators.required],
author : ['', Validators.required],
publishedDate : ['', Validators.required],
bestSeller : [false],
discount : [false],
cover : [Cover.Hardback, Validators.required],
price : [0, Validators.required],
genre : ['', Validators.required],
description : ['', Validators.required],
image : ['', Validators.required],
})


}



ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

ngOnInit () {
  this.authService.getMe().subscribe ({
    next : (data) => {
    if(data?.role !== 'Admin') {
    this.router.navigate(['/'])
    return
    }
    this.user = data
    },
  })
  this.authService.getMe().subscribe((user : any) => {
  if (user)  {
  this.username = user.id
  this.getAllBooks()
  }
  })
  this.elementsForm()
  }
   
  getAllBooks (): void {
  console.log('Books List Fetched')
  this.bookService.getBooks().subscribe({
    next: (books: Book[]) => {
      this.dataSource.data = books;
    }
  });
  }
  
  applyFiter (event : Event ): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue
  }
  startEdit (book: Book) {
  this.editRowId = book.id
  this.editedBook = {...book}
  }
  cancelEdit() {
    this.editRowId = null;
    this.editedBook = {};
  }
  
  saveEdit(id: string) {
    const originalBook = this.dataSource.data.find(book => book.id === id)
    if (!originalBook)
     return
   const updatedBook: Book = {...originalBook,...this.editedBook}
   this.bookService.updateBook(id,updatedBook).subscribe (() => {
   this.getAllBooks()
   this.cancelEdit()
   })
   }
  
  deleteBook(id: string) {
    if (confirm('Do you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => this.getAllBooks());
    }
  }

  OnSubmit () : void {
  if(this.bookForm.valid) {
  const bookData : Book = this.bookForm.value
  console.log(bookData)
  this.bookService.createBook(bookData).subscribe ({
  next : (response) => {
  if ( response) {
  this.router.navigate(['books-lists'])
  }
  }
  })
  }
  }

  usersLists () {
    this.router.navigate(['/users-lists'])
    }
  
    adminPanel () {
      this.router.navigate(['/admin-panel'])
    }
  
    deliveriesLists () {
      this.router.navigate(['/deliveries-lists'])
    }
  
    ordersLists()  {
    this.router.navigate(['/orders-lists'])
    }
  
    employeeLists()  {
    this.router.navigate(['employees-list'])
    }

}



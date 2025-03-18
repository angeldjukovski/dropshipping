import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../types/book.interface';
import {MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatCardModule,],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
book: Book | null = null

ngOnInit(): void {
const storedBook = localStorage.getItem('selectedBook') 
if(storedBook) {
this.book = JSON.parse(storedBook)
}
}


}
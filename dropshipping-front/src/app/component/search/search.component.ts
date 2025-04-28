import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BookServiceService } from '../book-service.service';
import { Book } from '../../types/book.interface';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { CommonModule } from '@angular/common'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatAutocompleteModule,
    MatOptionModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', '../products/book-data/book-data.component.scss']
})
export class SearchComponent implements OnInit {
  stateCtrl = new FormControl(); 
  books: Book[] = []; 
  loading = false; 

  constructor(private bookService: BookServiceService, private route: Router) { }

  ngOnInit(): void {
    this.stateCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query) {
          this.loading = true;
          return this.bookService.searchBooks(query);
        } else {
          return []; 
        }
      })
    ).subscribe((books: Book[]) => {
      this.books = books;
      this.loading = false;
    });
  }

  viewDetails(book: Book): void {
    localStorage.setItem('selectedBook', JSON.stringify(book))
    this.route.navigate(['book-details', book.id]);
  }
}
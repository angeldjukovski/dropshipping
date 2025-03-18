import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../types/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  private apiUrl = `http://localhost:3000/api/book-details/`;
  constructor(private http: HttpClient) { }

  getBookDetails(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}${id}`);
  }
}

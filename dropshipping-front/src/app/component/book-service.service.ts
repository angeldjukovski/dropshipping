import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../types/book.interface';
import { Sort } from '../types/sort.enum';


@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private apiUrl = 'http://localhost:3000/api/book-db'
  constructor(private http:HttpClient) { }
   
  searchBooks(query:string):Observable<Book[]>{
  return this.http.get<any[]>(`http://localhost:3000/api/genre/search?query=${query}`);
  }
  
  getBooks(): Observable<Book[]>  {
  return this.http.get<Book[]>(this.apiUrl)
  }

  getBook(id:string): Observable<Book> {
  return this.http.get<Book>(`${this.apiUrl}/book/${id}`)
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  


  /*/getBookByDetails(id: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/api/book-details/${id}`);
  }*/
  
  getBooksByGenre (genre:string) : Observable <Book[]> {
  return this.http.get<Book[]>(`${this.apiUrl}/genre/${genre}`)
  }
  
 /* getRandomBooks(count: number = 5): Observable<Book[]> {
    const params = new HttpParams().set('count', count.toString());
    return this.http.get<Book[]>(`${this.apiUrl}`, { params });
  }*/
    getBestSeller(bestSeller:boolean): Observable <Book[]> {
    const params = new HttpParams().set ("bestSeller",bestSeller.toString())
    return this.http.get<Book[]>(`${this.apiUrl}/bestseller`, { params });
    }
    getBestBargain(bestSeller:boolean, discount:boolean): Observable <Book[]> {
    const params = new HttpParams()
    .set('bestSeller', bestSeller.toString())
    .set('discount', discount.toString());
    return this.http.get<Book[]>(`${this.apiUrl}/bargains`, { params });
    }

    movePage(genre:string,  page:number, limit:number, sort:Sort): Observable <{books:Book[]; total: number}> {
    const params = new HttpParams()
    .set ('page', page.toString())
    .set ('limit', limit.toString())
    .set('sort', sort.toString())
    return this.http.get<{ books: Book[]; total: number }>(`${this.apiUrl}/genre/${genre}/page`, { params });
    }
    
  
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { WishLsit } from "../../types/wishlist.interface";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

apiUrl = 'http://localhost:3000/api'

constructor(private http: HttpClient) {}


getWishList() : Observable<WishLsit[]> {
return this.http.get<WishLsit[]>(`${this.apiUrl}/wishlist`)
}

deleteBook(bookID: string): Observable<void> {
return this.http.delete<void>(`${this.apiUrl}/wishlist`, {body : {bookID}});
}

addWishListBook (bookID:string): Observable<any> {
if(!bookID || bookID.length !== 24  ) {
console.error('invalid BOOKID', bookID) 
return throwError(() => new Error('Invalid Book ID'));
}
return this.http.post(`${this.apiUrl}/wishlist`, {bookID})
}

}
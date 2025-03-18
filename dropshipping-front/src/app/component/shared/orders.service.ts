import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { Orders } from "../../types/orders.interface";

@Injectable ({
providedIn: 'root'
})

export class OrdersService {
apiURL = 'http://localhost:3000/api'

constructor(private http: HttpClient) {} 

getOrderData(): Observable<Orders[]>  {
return this.http.get<Orders[]>(`${this.apiURL}/orders`)
}

deleteOrderData(bookID: string, userID: string, deliveryID: string): Observable<void> {
return this.http.delete<void>(`${this.apiURL}/wishlist`, { body: { bookID, userID, deliveryID } });
}

createOrderData (bookID: string, userID: string, deliveryID: string): Observable<any> { 
return this.http.post<any>(`${this.apiURL}/wishlist`, { body: { bookID, userID, deliveryID } });
}
}
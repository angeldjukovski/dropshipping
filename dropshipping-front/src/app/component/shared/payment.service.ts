import { Injectable } from "@angular/core";
import { NotificationService } from "./notification.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Product } from "../../types/product.interface";
import { Book } from "../../types/book.interface";




@Injectable ({
providedIn : 'root'
})

export class PaymentService {
private apiUrl = 'http://localhost:3000/api'


constructor(private http : HttpClient, private notificationService : NotificationService)  {}  

processPayment(cartItems : any [], totalPrice : number, token : string): Observable <any> {
return this.http.post (`${this.apiUrl}/cart`, {cartItems,totalPrice,token}). pipe (
    switchMap(() => {
        this.notificationService.showNotification('Successful form submission');
        return of(null);
      }),
      catchError((errorResponse) => {
        this.notificationService.showNotification(errorResponse.error.message);
        return of(null);
      })
)
}

getProduct(userId: string): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/cart`).pipe(
    switchMap((products) => {
      const product = products.filter((product) => product.userId === userId);
      if (product.length > 0) {
        console.log('Fetched product data:', product);
      }
      return of(product);
    }),
    catchError((errorResponse) => {
      this.notificationService.showNotification(errorResponse.error.message);
      return of([]);
    })
  );
}

getAllProducts() : Observable <Product[]>  {
return this.http.get<Product[]>(`${this.apiUrl}/cart/orders-lists`).pipe (
  catchError(error => {
    this.notificationService.showNotification(error.error.message);
    return of([]);
  })
)
}

deleteProduct(id : string) : Observable <void> {
return this.http.delete<void>(`${this.apiUrl}/cart/${id}`)
}

updateProduct(userId : string, product : Partial <Product>) : Observable <Product> {
return this.http.patch<Product>(`${this.apiUrl}/orders-lists/${userId}`,product)
}

assignOrder (orderId : string, employeeId : string, newassignmentStatus : 'Unassigned'| 'Assigned') {
return this.http.patch(`${this.apiUrl}/cart/assign/${orderId}`, {employeeId , assignmentStatus:newassignmentStatus})
} 

updateOrderStatus(orderId : string, newStatus : 'taken' | 'delivered') : Observable<any> {
return this.http.patch(`${this.apiUrl}/cart/status/${orderId}`, {status : newStatus})
}

getOrder(employeeId : string) : Observable <Product[]>  {
return this.http.get<Product[]>(`${this.apiUrl}/cart/${employeeId}`)
}

}
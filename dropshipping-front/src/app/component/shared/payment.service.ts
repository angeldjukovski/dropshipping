import { Injectable } from "@angular/core";
import { NotificationService } from "./notification.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';




@Injectable ({
providedIn : 'root'
})

export class PaymentService {
private apiUrl = 'http://localhost:3000/api'


constructor(private http : HttpClient, private notificationService : NotificationService)  {}  

processPayment(cartItems : any [], totalPrice : number, paymentMethodId : string): Observable <any> {
return this.http.post (`${this.apiUrl}/cart`, {cartItems,totalPrice,paymentMethodId}). pipe (
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

}
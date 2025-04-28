import { Injectable } from "@angular/core";
import { NotificationService } from "./notification.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Delivery } from "../../types/delivery.interface";
import { DeliveryDay } from "../../types/delivery-day.enum";
import { DeliveryLocation } from "../../types/delivery-location.enum";

@Injectable ({
providedIn : 'root'
})

export class DeliveryService {
private apiUrl = 'http://localhost:3000/api'

constructor (private readonly http : HttpClient,private readonly  notificationService: NotificationService) {}

createDelivery(deliveryData: Delivery) : Observable<any> {
return this.http.post(`${this.apiUrl}/delivery`,deliveryData).pipe (
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


editDelivery (updateData : any ) : Observable<any>  {
return this.http.put(`${this.apiUrl}/delivery`,updateData).pipe (
switchMap (() => {
this.notificationService.showNotification('successful edit')
 return of(null);
}),
catchError((errorResponse) => {
this.notificationService.showNotification(errorResponse.error.message);
return of(null);
})
)
}

getDelivery(userId: string): Observable<Delivery | null> {
    return this.http.get<Delivery[]>(`${this.apiUrl}/delivery`).pipe(
      switchMap((deliveries) => {
        const userDelivery = deliveries.find(delivery => delivery.userId === userId) || null;
        return of(userDelivery);
      }),
      catchError((errorResponse) => {
        this.notificationService.showNotification(errorResponse.error.message);
        return of(null);
      })
    );
  }

  getAllDeliveries() : Observable <Delivery[]> {
  return this.http.get<Delivery[]>(`${this.apiUrl}/delivery/deliveries-lists`)
  }
  
  deleteDelivery(id:string):Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delivery/${id}`)
  }

  updateDelivery(userId:string, delivery: Partial<Delivery>) : Observable <Delivery> {
  return this.http.patch<Delivery>(`${this.apiUrl}/delivery/${userId}`,delivery)
  }

}
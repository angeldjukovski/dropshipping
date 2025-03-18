import { Injectable, } from "@angular/core";
import { NotificationService } from "./notification.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EditUser } from "../../types/edit-user.interface";
import { throwError } from "rxjs";

@Injectable ({
providedIn : 'root'
})

export class EditProfileService {
private apiUrl = 'http://localhost:3000/api'

constructor (private readonly http : HttpClient,private readonly  notificationService: NotificationService) {}  

editProfile (updateData : any ) : Observable<any>  {
    return this.http.put(`${this.apiUrl}/edit-profile`,updateData).pipe (
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

    getUser(id: string): Observable<EditUser | null> {
        return this.http.get<EditUser[]>(`${this.apiUrl}/edit-profile`).pipe(
          switchMap((users) => {
            const userData = users.find(user => user.id === id) || null;
            return of(userData);
          }),
          catchError((errorResponse) => {
            this.notificationService.showNotification(errorResponse.error.message);
            return of(null);
          })
        );
      }



}




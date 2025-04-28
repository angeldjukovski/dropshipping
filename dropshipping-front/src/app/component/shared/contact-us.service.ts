import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { NotificationService } from "./notification.service";

@Injectable ({
providedIn : 'root'
})

export class ContactUsService {

private apiUrl = 'http://localhost:3000/api/contact'

constructor(private http : HttpClient,  private notificationService : NotificationService ) {}  

sendMessage(input : any) : Observable<any>  {
return this.http.post(this.apiUrl, input).pipe (
tap(() =>{
this.notificationService.showNotification('The message is sent');
})
)
}




}
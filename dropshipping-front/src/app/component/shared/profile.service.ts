import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../types/user.interface";

@Injectable ({
providedIn: 'root'
})

export class ProfileService {
 private apiUrl = 'http://localhost:3000/api/user/profile'
 constructor (private http: HttpClient) {}

 getUser() : Observable<User> {
const headers = new HttpHeaders ({
Athorization: `Bearer ${localStorage.getItem('token')}`
})
return this.http.get<User>(this.apiUrl, {headers})
 
}
}
import { Injectable,signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from "../../types/user.interface";
import { AuthResponse } from "../../types/auth-response.interface";
import { NotificationService } from "./notification.service";
import { LoggingService } from "./logging.service";
import { getErrorData } from "../utilis/api.helper";
import { response } from "express";

@Injectable ({
providedIn : 'root'
})

export class AuthService {
private apiUrl = 'http://localhost:3000/api'
private authPath = `${this.apiUrl}/auth`
private userPath = `${this.apiUrl}/user`

isAuth = signal<boolean>(false)
currentUser = signal<User | null>(null)

constructor(private readonly http: HttpClient, private readonly router: Router, private readonly notificationService: NotificationService, private readonly loggingService: LoggingService)  {}

register(id:string,firstName : string, lastName: string, email:string, password:string, confirmPassword:string)  {
  const requestBody = {id,firstName, lastName,email,password, confirmPassword};
  return this.http.post(`${this.authPath}/register`,requestBody).pipe (
  switchMap (() => {
  this.notificationService.showNotification('succesfull registration')
  return this.getMe()
  }),
  catchError((errorResponse) => {
  this.notificationService.showNotification(errorResponse.error.message);
  return of(null);
   })
  )
  }


login(email: string, password: string) {
return this.http
.post <AuthResponse>(`${this.authPath}/sign-in`,{email,password})
.pipe( tap((response) => {
console.log("Login Test",response)
if(response.token && response.refreshToken) {
this.setToken(response.token, 'access')
this.setToken(response.refreshToken, 'refresh')
this.isAuth.set(true)
} else {
console.error('Token is Missing')
}
}),
switchMap (() => {
this.notificationService.showNotification('succesfull login')
return this.getMe()
}),
catchError((errorResponse) => {
this.notificationService.showNotification(errorResponse.error.message);
this.isAuth.set(false)
return of (null)
})
)
}
getMe():Observable<User | null>  {
  if(!this.getToken('access')) {
  return of(null);
  }
  return this.http.get <User>(`${this.userPath}/profile`).pipe (
  tap((response) => {
  this.currentUser.set(response)
  this.isAuth.set(true)
  }),
  catchError((error: any) => {
  this.isAuth.set(false)
  this.currentUser.set(null)
  return of (null)
  })
  )
  }
refreshToken () {
const refreshToken = this.getToken('refresh')
return this.http
.post <AuthResponse>(`${this.authPath}/refresh-token` , {refreshToken} )  
.pipe(
tap ((response) => {
this.setToken(response.token, 'access');
this.setToken(response.refreshToken, 'refresh');
this.isAuth.set(true);
}),
catchError((error) => {
if(error.status === 401) {
this.logout()
}
return of (null)
})
)
}
logout()  {
this.removeToken ('access')
this.removeToken ('refresh')
this.isAuth.set(false)
this.router.navigate(['/sign-in'])
this.notificationService.showNotification('succesfull logout')
}

restPassword(email: string, newpassword: string, token:string)  {
const requestBody = {email, newpassword,}
return this.http.post(`${this.authPath}/forgot-password?token=${token}`,requestBody).pipe (
switchMap(() => {
this.notificationService.showNotification('succesfull change of the password')
return this.getMe()
}),
catchError((errorResponse) => {
this.notificationService.showNotification(errorResponse.error.message);
return of(null);
})
)
}

verifyEmail (email:string, token:string) {
const requestBody = {email,token}
return this.http.post(`${this.authPath}/verify-email`,requestBody).pipe (
switchMap(() => {
this.notificationService.showNotification('The verification has sccusfully been sent')
return this.getMe()
 }),
catchError((errorResponse) => {
this.notificationService.showNotification(errorResponse.error.message);
return of(null);
})
 )
}

private setToken (token:string, type: 'access' | 'refresh') {
localStorage.setItem(type,token)
}
getToken (key: 'access' | 'refresh') {
return localStorage.getItem(key)
}
private removeToken (key : 'access' | 'refresh') {
localStorage.removeItem(key)
}
}
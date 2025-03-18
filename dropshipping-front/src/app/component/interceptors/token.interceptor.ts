import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

const WHITELIST = ['http://localhost:3000/api/auth/sign-in']

export const tokenInterceptor : HttpInterceptorFn = (req, next) => {
console.log('request of url is sent',req.url)
const isUrlWhiteList = WHITELIST.includes(req.url)
if(isUrlWhiteList) {
return next(req)
}
console.log(req.url)
const authService = inject(AuthService)
const accessToken = authService.getToken('access')

const newRequest = req.clone ({
setHeaders: {
Authorization : `Bearer ${accessToken}`
}
})
return next(newRequest).pipe(
catchError((error) => {
if (error.status === 401 && accessToken) {
console.log('Token expired', error);
console.log('About to refresh the token...');

return authService.refreshToken().pipe(
switchMap(() => {
const newAccessToken = authService.getToken('access');

const requestWithUpdatedToken = req.clone({
setHeaders: {
Authorization: `Bearer ${newAccessToken}`
},
});
return next(requestWithUpdatedToken);
 }),
);
}
return throwError(() => new Error(error));
}),
);
};
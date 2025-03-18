import { AuthService } from "../shared/auth.service";
import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { UserRole} from "../../types/user-role.enum";


export const authGuard: CanActivateFn = (route) => {
const authService = inject(AuthService)
const router = inject (Router)

if(!authService.isAuth()) {
router.navigate (['/sign-in'])
return false
}
console.log(route.data['roles'])
const allowedRouteRoles = route.data['roles'] as UserRole[];

if(allowedRouteRoles?.length) {
const userRole = authService.currentUser()?.role

if(!userRole) {
return router.navigate(['/not-allowed'])
}
const isUserAllowed : boolean = allowedRouteRoles.some (
(role: UserRole) => role === userRole
)
if(!isUserAllowed) {
return router.navigate(['/not-allowed'])
}
}
return true
}
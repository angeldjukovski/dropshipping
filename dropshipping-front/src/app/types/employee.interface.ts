import { Gender } from "./gender.enum"
import { UserRole } from "./user-role.enum"


export interface Employee {
 id : string, 
 firstName : string, 
 lastName : string, 
 email : string ,
 password : string, 
 gender : Gender, 
 salary : number, 
 education : string,
 role : UserRole
}
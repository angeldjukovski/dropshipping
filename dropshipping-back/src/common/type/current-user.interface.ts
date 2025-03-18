import { UserRole } from "user/schema/user-role.enum";

export interface CurrentUser {
email:string 
sub:string
userId: string
role: UserRole
}
import { Exclude,Expose } from "class-transformer";
import { UserRole } from "user/schema/user-role.enum";


export class User  {

@Expose()
id:string;

@Expose()
firstName:string

@Expose()
lastName:string

@Expose()
email:string

@Expose()
role:UserRole

@Expose()
guestId:string

@Exclude()
password:string

@Exclude()
refreshTokens: string[]

@Exclude()
createdAt : Date

@Exclude()
createdBy: string

@Exclude()
updatedAt : Date


}
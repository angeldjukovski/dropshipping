import { IsString, IsNumber, IsEmail,IsNotEmpty, IsEnum, IsOptional,} from "class-validator" 
import { Type } from "class-transformer"
import { UserRole } from "user/schema/user-role.enum"
import { Gender } from "employee/schema/gender.enum"


export class CreateEmployeeDTO {

@IsString()
@IsNotEmpty()
id : string

@IsEmail()
@IsNotEmpty() 
email : string 

@IsString()
@IsNotEmpty() 
password : string 

@IsString()
@IsNotEmpty()
firstName : string 

@IsString()
@IsNotEmpty()
lastName : string 

@IsEnum(Gender) 
@IsNotEmpty()
gender : Gender

@IsString() 
@IsNotEmpty()
education : string 

@Type(() => Number)
@IsNumber()
@IsNotEmpty() 
salary : number 

@IsOptional()
@IsEnum(UserRole)
role?: UserRole = UserRole.Employee


}
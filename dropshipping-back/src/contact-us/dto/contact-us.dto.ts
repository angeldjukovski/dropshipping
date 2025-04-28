import { IsString,IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class ContactUsDTO {

@IsString()
name : string

@IsEmail() 
@IsOptional()
email?: string


@IsNotEmpty()
@IsString() 
message : string

}
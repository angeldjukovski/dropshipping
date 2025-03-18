import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsEmail, IsStrongPassword } from "class-validator";

export class UserEditDTO {
@IsString()
 @IsNotEmpty()
 id: string;
@IsString()
@IsNotEmpty()
firstName: string;

@IsString()
@IsNotEmpty()
lastName: string;

@IsEmail()
@IsNotEmpty()
email: string;

}
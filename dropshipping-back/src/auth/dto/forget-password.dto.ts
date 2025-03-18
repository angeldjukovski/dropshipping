import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, IsOptional, IsNotEmpty, IsUUID } from "class-validator";
import { UserRole } from "../../user/schema/user-role.enum";

export class ForgetPasswordDTO {
@IsEmail()
@ApiProperty({description: 'Email is required'})
email: string;

@IsStrongPassword()
@ApiProperty({description: 'Password is required'})
newpassword: string;

@IsString()
@IsOptional()
@ApiProperty({description: 'Token is optional'})
token: string;

@IsString()
@IsOptional()
@ApiProperty({description: 'Role is optional'})
role: UserRole;



}
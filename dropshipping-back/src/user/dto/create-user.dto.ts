import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsStrongPassword, } from "class-validator";
import { UserRole } from "user/schema/user-role.enum";

export class CreateUserDTO {
@IsEmail()
@ApiProperty()
email:string

@IsStrongPassword()
@ApiProperty()
password: string

@IsEnum(UserRole) 
@IsOptional()
@ApiProperty()
role: UserRole = UserRole.Costumer
}
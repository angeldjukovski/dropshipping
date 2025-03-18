import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, IsOptional, IsNotEmpty, IsUUID, IsEnum, isEnum } from "class-validator";
import { UserRole } from "../../user/schema/user-role.enum";

export class RegisterDTO {
@IsString()
@IsNotEmpty()
@IsOptional()
id: string;

@IsString()
@IsNotEmpty()
@ApiProperty({description: 'First name is required'})
firstName: string;

@IsString()
@IsNotEmpty()
@ApiProperty({description: 'Last name is required'})
lastName: string;


@IsEmail()
@ApiProperty({description: 'Email is required'})
email: string;

@IsStrongPassword()
@ApiProperty({description: 'Password is required'})
password: string;

@IsEnum(UserRole)
@IsOptional()
@ApiProperty({description: 'Role is optional'})
role: UserRole = UserRole.Costumer

}
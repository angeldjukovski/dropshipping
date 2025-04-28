import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "user/schema/user-role.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString,} from "class-validator";

export class LoginDTO  {
@ApiProperty()
@IsEmail()
@IsNotEmpty()
email : string

@ApiProperty()
@IsNotEmpty()
@IsString()
password : string

@ApiProperty()
@IsNotEmpty()
@IsOptional()
@IsEnum(UserRole)
role: UserRole = UserRole.Customer

}
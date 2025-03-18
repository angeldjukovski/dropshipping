import { IsEnum,IsNotEmpty } from "class-validator"
import { UserRole } from "user/schema/user-role.enum"
import { ApiProperty } from "@nestjs/swagger"

export class UserRoleDTO {
@IsEnum(UserRole)
@IsNotEmpty()
@ApiProperty({enum:UserRole,example:UserRole.Costumer})
role:UserRole
}
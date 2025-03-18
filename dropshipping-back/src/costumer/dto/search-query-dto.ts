import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsEmail, IsString, IsNotEmpty } from "class-validator";

export class SearchQueryDTO {
@IsOptional()
@IsEmail()
@ApiPropertyOptional()
email? : string

@IsOptional()
@IsString()
@ApiPropertyOptional()
name?:string

}
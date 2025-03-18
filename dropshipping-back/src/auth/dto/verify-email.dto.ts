import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString,IsOptional } from "class-validator";

export class VerifyEmailDTO {
    @IsEmail()
    @ApiProperty({description: 'Email is required'})
    email: string;


    @ApiProperty ({description: 'Token is required'})
    @IsString()
    @IsOptional()
    token: string;
} 



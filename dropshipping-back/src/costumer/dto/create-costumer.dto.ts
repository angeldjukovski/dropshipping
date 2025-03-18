import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, } from 'class-validator';

export class CreateCostumerDTO {
    @IsEmail()
    @ApiProperty()
    email:string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty() 
    lastName : string
}
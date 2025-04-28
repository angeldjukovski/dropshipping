import {IsString,IsNumber,IsDateString,IsOptional} from "class-validator"

export class CreateBookDTO {
@IsString()
title:string;

@IsString()
author:string;

@IsOptional()
@IsDateString()
publishedDate?:string;

@IsNumber()
price:number;

@IsString()
@IsOptional()
description?: string;

@IsString()
@IsOptional()
image?:string

}
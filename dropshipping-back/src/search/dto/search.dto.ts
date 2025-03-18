import { IsOptional,IsString } from "class-validator";


export class SearchBookDTO {

@IsString()
@IsOptional()
genre?:string

@IsString()
@IsOptional()
query?:string
}
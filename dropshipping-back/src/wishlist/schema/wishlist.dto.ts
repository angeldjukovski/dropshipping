import { IsString,IsNotEmpty } from "class-validator/types";

export class WishListDTO {
@IsString()
@IsNotEmpty()
userId : string;

@IsString()
@IsNotEmpty()
bookId : string
}
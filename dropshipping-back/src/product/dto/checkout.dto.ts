    import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
    import { Type } from 'class-transformer';
    import { CartItemsDTO } from './cart-items.dto';


export class CheckoutDTO {
    @IsArray()
    @ValidateNested({ each: true })
    @Type (() => CartItemsDTO)
    cartItems : CartItemsDTO[];

    @IsNumber()
    totalPrice : number 

    @IsString()
    token : string
}
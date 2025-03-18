
import { DeliveryDay } from "delivery/schema/delivery-day.enum";
import { DeliveryLocation } from "delivery/schema/delivery-location.enum";
import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator";


export class DeliveryDTO {
@IsString()
@IsNotEmpty()
userId: string;

@IsString ()
@IsNotEmpty()
name : string;

@IsString ()
@IsNotEmpty()
email : string;

@IsString ()
@IsNotEmpty()
phoneNumber : string;

@IsString ()
@IsNotEmpty()
address : string;

@IsString ()
@IsNotEmpty()
zipcode : string;

@IsString()
@IsEnum(DeliveryLocation)
@IsNotEmpty()
deliveryLocation : DeliveryLocation;

@IsString()
@IsEnum(DeliveryDay)
@IsNotEmpty()
deliveryDay : DeliveryDay;

}
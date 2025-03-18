import { DeliveryDay } from "./delivery-day.enum";
import { DeliveryLocation } from "./delivery-location.enum";


export interface Delivery {
userId:string,
name : string,
email : string,
phoneNumber : number,
address : string,
zipcode : string,
deliveryDay : DeliveryDay,
deliveryLocation : DeliveryLocation,
}
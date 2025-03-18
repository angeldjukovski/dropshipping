import { Schema } from "mongoose";
import { DeliveryDay } from "./delivery-day.enum";
import { DeliveryLocation } from "./delivery-location.enum";
import { Types } from "mongoose";

export const DeliverySchema = new Schema ({
userId : {type: String, required: true},
name : {type: String, required: true,},
email : {type: String, required: true},
phoneNumber : {type: Number, required: true},
address : {type: String, required: true},
zipcode : {type: String, required: true},
deliveryDay : {type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], default: 'Monday'},
deliveryLocation : {type: String, enum: ["North America", 'Western Europe', "Eastern Europe"], default: 'North America'},
createdAt : {type:Date, default:() => new Date()},
createdBy : {type:String, default: 'system'},
updatedAt : {type:Date, default:() => new Date()},
})

export interface DeliveryBack {
userId:string,
name : string,
email : string,
phoneNumber : number,
address : string,
zipcode : string,
deliveryDay : DeliveryDay,
deliveryLocation : DeliveryLocation,
createdAt?: Date;
createdBy?: string;
updatedAt?: Date;
}

export interface DeliveryDocument extends DeliveryBack, Document {}
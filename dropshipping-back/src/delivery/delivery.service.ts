import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist';
import { DeliveryBack, DeliveryDocument } from './schema/delivery.schema';
import { DeliveryDTO } from './dto/delivery.dto';
import { Model } from 'mongoose';
import { DeliveryDay } from './schema/delivery-day.enum';
import { DeliveryLocation } from './schema/delivery-location.enum';
import { UserEditDTO } from 'user/dto/edit-user.dto';
import { Types } from 'mongoose';
import { EditDeliveryDTO } from './dto/delivery.edit.dto';



@Injectable()
export class DeliveryService {

constructor(@InjectModel('delivery') private deliveryModel: Model <DeliveryDocument>)   {}

async createDelivery (deliveryDTO : DeliveryDTO): Promise <DeliveryBack> {
const {userId,name,email, phoneNumber, address,zipcode, deliveryDay, deliveryLocation } = deliveryDTO
const createdDelivery = await this.deliveryModel.create ({
userId,
name,
email,
phoneNumber,
address,
zipcode,
deliveryDay : deliveryDay ?? DeliveryDay.Monday,
deliveryLocation : deliveryLocation ?? DeliveryLocation.NorthAmerica
});
return createdDelivery
}

async getDelivery(userId: string): Promise<DeliveryDocument[]> {
const delivery = await this.deliveryModel.find({userId}).exec()
console.log(`Delivery Data of ${userId} : `, delivery)
return delivery
}

async getAllDeliveries():Promise <DeliveryDocument[]>  {
const delivery = this.deliveryModel.find().exec()
return delivery 
}

async updateDelivery(userId : string, editDeliveryDTO: EditDeliveryDTO) {
const updateDelivery = await this.deliveryModel.findOneAndUpdate({userId},editDeliveryDTO, {new:true}).exec()
return updateDelivery
}

async editDelivery(userId: string,  editDeliveryDTO: EditDeliveryDTO) :Promise <DeliveryBack> {
const editDelivery = await this.deliveryModel.findOneAndUpdate({userId}, {...editDeliveryDTO},  { new: true, upsert: true, returnDocument: 'after' } )
return editDelivery
}

async deleteDelivery(id : string): Promise <DeliveryDocument | null> {
const deleteDelivery = await this.deliveryModel.findByIdAndDelete(id).exec() 
return deleteDelivery
}

}

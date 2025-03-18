import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDocument } from "user/schema/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose/dist";
import { UserEditDTO } from 'user/dto/edit-user.dto';


@Injectable()
export class EditProfileService  {
 constructor(@InjectModel('users') private userModel: Model<UserDocument>, ) {}

async getUser(id: string): Promise<UserDocument[]> {
const edit = await this.userModel.find({id}).exec()
console.log(`User Data of ${id} : `, id)
return edit
}

async editUser (id:string, userEditDTO : UserEditDTO ): Promise <UserDocument>  {
const editDelivery = await this.userModel.findOneAndUpdate({id}, {...userEditDTO},  { new: true, upsert: true, returnDocument: 'after' } )
return editDelivery
}

}
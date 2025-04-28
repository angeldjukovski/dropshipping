import { Injectable,BadRequestException,NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRoleDTO } from './dto/update.role.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist';
import { UserDocument } from './schema/user.schema';
import { CostumerDocument } from 'costumer/schema/costumer.schema';
import { User } from './dto/user.dto';
import { UserEditDTO } from './dto/edit-user.dto';
import { plainToClass } from 'class-transformer';
import mongoose from 'mongoose';



@Injectable()
export class UserService {
constructor(@InjectModel('users') private userModel: Model<UserDocument>, @InjectModel('users')  private costumerModel : Model <CostumerDocument>)  {}

async create(createUserDTO: CreateUserDTO): Promise <User> {
try {
const user = await this.userModel.create(createUserDTO)
const costumer = await this.costumerModel.findOne ({
email: createUserDTO.email
})
if(costumer) {
await this.costumerModel.updateOne({id:costumer.id},{userId: user.id})
}
return plainToClass(User,user.toObject())

} catch(error) {
throw new BadRequestException(error, 'Error during creating user');
}

}

findAll(): Promise <User[]>  {
return this.userModel.find()
}
    
findOneById(id:string): Promise <UserDocument> {
return this.userModel.findById(id)
}

findByEmail (email: string) : Promise <UserDocument[]>  {
return this.userModel.find({email}).exec()
}

async updateUser (username:string, updateUserDTO : UpdateUserDTO ): Promise <UserDocument>  {
const update = await this.userModel.findOneAndUpdate({id : username},updateUserDTO, {new:true}).exec()
return update
}

async updateUserRole  (id:string, updateUserRoleDTO : UserRoleDTO ): Promise <UserDocument>  {
const updateRole = await this.userModel.findByIdAndUpdate(id,updateUserRoleDTO, {new:true}).exec()
return updateRole
}

async delete (id:string):Promise <UserDocument | null> {
const deleteUser = await this.userModel.findByIdAndDelete(id).exec()
return deleteUser
}
}
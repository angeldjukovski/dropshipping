import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { CostumerDocument } from './schema/costumer.schema';
import { UserDocument } from 'user/schema/user.schema';
import { Model } from 'mongoose';
import { CreateCostumerDTO } from './dto/create-costumer.dto';
import { SearchQueryDTO } from './dto/search-query-dto';
import { UpdateCostumerDTO } from './dto/update.dto';

@Injectable()
export class CostumerService {

constructor(@InjectModel('users') private costumerModel: Model <CostumerDocument>,  @InjectModel('users') private userModel : Model <UserDocument>)  {}

async createCostumer (createCostumerDTO : CreateCostumerDTO):Promise <CostumerDocument>  {
const user = await this.userModel.findOne ({
email: createCostumerDTO.email
})
try  {
const costumerData = user ? {...createCostumerDTO,userId : user.id}: createCostumerDTO
const newCostumer = new this.costumerModel(costumerData)
return await newCostumer.save()
}catch(error) {
throw new BadRequestException(error, "Error in Creation Costumer section")
}
}
async findAll (searchQueryDTO:SearchQueryDTO) : Promise <CostumerDocument[]> {
const {email, name} = searchQueryDTO
const search : any = {}
if (email)  {
search.email = new RegExp (email, 'i')
}
if(name)  {
search.name = new RegExp(name, 'i')
}
return this.costumerModel.find (search).exec()
} 

async getById ( id : string) : Promise <CostumerDocument>  {
const getCostumer = await this.costumerModel.findById({id}).exec()
return getCostumer
}
async getByEmail (email: string) : Promise <CostumerDocument[]>  {
return await this.costumerModel.find({email}).exec()
}
async update (id:string, updateCostumerDTO : UpdateCostumerDTO ): Promise <CostumerDocument>  {
const updateCostumer = await this.costumerModel.findByIdAndUpdate(id,updateCostumerDTO, {new:true}).exec()
return updateCostumer
}
async delete (id:string):Promise <CostumerDocument | null> {
const deleteCostumer = await this.costumerModel.findByIdAndDelete(id).exec()
return deleteCostumer
}

}

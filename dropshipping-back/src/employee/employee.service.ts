import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { EmployeeBack, EmployeeDocument, EmployeeSchema } from './schema/employee.schema';
import { UserDocument } from 'user/schema/user.schema';
import { Model } from 'mongoose';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt'
import { plainToInstance } from 'class-transformer/types';
import { UserRole } from 'user/schema/user-role.enum';
import { LoginDTO } from 'auth/dto/login.dto';
import { RefreshTokenDto } from 'auth/dto/refresh-token.dto';
import { RefreshTokenDtoResponse } from 'auth/dto/refresh-token-response.dto';


@Injectable()
export class EmployeeService {

private employeeModel : Model <any>

constructor(@InjectModel('users') private userModel : Model <UserDocument>,)   {
this.employeeModel = this.userModel.discriminator('Employee', EmployeeSchema)
}    



async createEmployee(createEmployeeDTO : CreateEmployeeDTO) : Promise <EmployeeDocument> {
console.log('Backend Check from service', createEmployeeDTO) 
try {

const {id,firstName,lastName,email,education,salary,password,gender,} = createEmployeeDTO 
const employee = await this.employeeModel.findOne({email}) 
if(employee) {
throw new BadRequestException(`The Employee with email ${email} already exists`);
}
const hashedPassword = await bcrypt.hash(password, Number (process.env.BCRYPT_SALT)) 
const createEmployee = this.employeeModel.create ({
id,
email , 
firstName, 
lastName,
password : hashedPassword,
gender,
education,
salary,
role : createEmployeeDTO.role ?? UserRole.Employee
})
return createEmployee 
} catch(error) {
console.error('Error from Backend employee Service:',error) 
throw error
}
}

async findAllEmployees() : Promise <EmployeeBack[]> {
return this.employeeModel.find()
}

async updateEmployee(username : string, updateEmployeeDTO : UpdateEmployeeDTO) : Promise <EmployeeDocument> {
const update = await this.employeeModel.findOneAndUpdate({id:username},updateEmployeeDTO, {new:true}).exec ()  
return update 
}

async deleteEmployee(id : string) : Promise <EmployeeDocument> {
const deleteEmployee = await this.employeeModel.findByIdAndDelete(id) 
return deleteEmployee
}




}

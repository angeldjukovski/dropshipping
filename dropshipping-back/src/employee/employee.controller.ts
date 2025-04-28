import { Controller,Post, Body, UseGuards, Get, Patch , Delete, Param } from '@nestjs/common';
import { Role } from 'common/decorator/role.decorator.decorator';
import  { RolesGuard } from 'common/guard/role.guard';
import { RoleValidatorType } from 'common/type/role.validator.enum';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { EmployeeService } from './employee.service';
import { UserRole } from 'user/schema/user-role.enum';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';



@Controller('employee')
export class EmployeeController {

constructor( private employeeService : EmployeeService)  {}


@Post()
async createEmployee(@Body() createEmployeeDTO : CreateEmployeeDTO )  {
return this.employeeService.createEmployee(createEmployeeDTO)
}


@Get()
async findAll ()  {
return this.employeeService.findAllEmployees()
} 


@Delete('/:id') 
async deleteEmployee(@Param('id') id : string)  {
return this.employeeService.deleteEmployee(id)
}


@Patch('/:id') 
async updateEmployee(@Body() updateEmployeeDTO : UpdateEmployeeDTO, @Param('id') id : string)  {
return this.employeeService.updateEmployee(id,updateEmployeeDTO)
}



}

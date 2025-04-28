import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { EmployeeSchema } from './schema/employee.schema';
import { UserSchema } from 'user/schema/user.schema';

@Module({
  imports : [
  MongooseModule.forFeature([{name : 'users', schema: UserSchema}]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}

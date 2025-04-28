import { Schema } from "mongoose";
import { UserRole } from "user/schema/user-role.enum";
import { UserBack } from "user/schema/user.schema";

export const EmployeeSchema = new Schema ({
gender : {type:String, enum : ['Male','Female', 'Other'], required : true},
education : {type:String, required : true},
salary : {type:Number, required : true},
})

export interface EmployeeBack extends UserBack  {
role : UserRole.Employee 
gender : string 
education : string 
salary : number
}

export interface EmployeeDocument extends EmployeeBack, Document {}
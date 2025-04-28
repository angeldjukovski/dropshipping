import {Schema} from 'mongoose'
import { UserRole } from 'user/schema/user-role.enum'

export const CostumerSchema = new Schema ({
id: {type:String,required: true},
email: {type: String, required: true},
firstName : {type: String, required: true},
lastName : {type: String, required: true},
password: {type:String, required: true},
role : {type: String, enum:['Admin','Customer','Employee'], default: "Customer" },
})

export interface CostumerBack  {
id:string
email:string 
firstName: string
lastName : string 
password : string
role : UserRole
}

export interface CostumerDocument extends CostumerBack, Document {}
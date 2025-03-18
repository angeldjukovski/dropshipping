import {Schema} from 'mongoose'

export const CostumerSchema = new Schema ({
id: {type:String,required: true},
email: {type: String, required: true},
firstName : {type: String, required: true},
lastName : {type: String, required: true},
password: {type:String, required: true},
})

export interface CostumerBack  {
id:string
email:string 
firstName: string
lastName : string 
password : string
}

export interface CostumerDocument extends CostumerBack, Document {}
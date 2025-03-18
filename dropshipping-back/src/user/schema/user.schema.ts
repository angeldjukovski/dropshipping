import { UserRole } from "./user-role.enum";
import { Schema } from "mongoose";

export const UserSchema = new Schema ({
id: {type: String, required: true},
firstName: {type: String, required: true},
lastName: {type: String, required: true},
email: {type: String, required: true},
password: {type:String, required: true},
role: {type: String, enum:['Admin','Costumer','Employee'], default: "Costumer" },
costumerid: {type:String, required:true},
refreshToken : {type:String, required:true},
createdAt : {type:Date, default:() => new Date()},
createdBy : {type:String, default: 'system'},
updatedAt : {type:Date, default:() => new Date()},
})

export interface UserBack {
id:string,
firstName:string,
lastName:string,
email:string,
password:string,
role: UserRole,
costumerid ?: string,
guestId?: string;
refreshTokens?: string[];
createdAt?: Date;
createdBy?: string;
updatedAt?: Date;
}

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
	delete ret.password;
	delete ret.refreshToken;
	return ret;
  },
});


export interface UserDocument extends UserBack, Document {}
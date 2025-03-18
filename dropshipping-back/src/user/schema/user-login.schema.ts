import { Schema, Document } from "mongoose";
import { UserRole } from "./user-role.enum";

export const UserSchema = new Schema ({
userid: {type: String,},
email: {type: String, required: true},
password: {type:String, required: true},
refreshToken: {type: String},
})

export interface UserLogin {
usserid?: string,
email:string,
password:string,
role: UserRole,
refreshTokens?: string[];
}

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.refreshToken;
    return ret;
  },
});

export interface UserLoginDocument extends UserLogin, Document {
}



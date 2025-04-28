import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv/lib/main";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from "user/schema/user-role.enum";

type JwtStrategyPayload = {
email: string
role : UserRole
sub: string
iat : number
exp : number
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor() {
    console.log("JWT Strategy is ok")
    console.log("JWT Secret in Strategy:", process.env.JWT_SECRET);
super ({
jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
ignoreExpiration : false ,
secretOrKey : process.env.JWT_SECRET
});
}
async validate(payload: JwtStrategyPayload) {

console.log("Validation Test, Validation Test")
console.log('Decoded JWT Payload:', payload)

if(!payload.role) {
console.log('Role is missing')
throw new Error ('ROLE IS MISSING')
}
return {
email: payload.email,
id: payload.sub,
role: payload.role ?? UserRole.Customer,
}
}

}
import { JwtService } from "@nestjs/jwt";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable() 

export class JwtAuthGuard extends AuthGuard('jwt')  {
constructor (private readonly jwtService: JwtService)  {
super();
console.log("GUARD WORKS")
}
async canActivate(context: ExecutionContext): Promise <boolean> {
const request = context.switchToHttp().getRequest()
console.log("ACTIVATION WORKS",)
const token = this.extractTokenFromHeader(request)
if(!token)   {
throw new UnauthorizedException()
}
try {
const payload = await this.jwtService.verifyAsync( token, {
secret : process.env.JWT_SECRET,
})
request['user'] = payload

}catch {
throw new  UnauthorizedException()
}
return true
}

private extractTokenFromHeader(request: Request): string | undefined {
const [type, token] = request.headers['authorization']?.split(' ') ?? [];
return type === 'Bearer' ? token : undefined;
}

}

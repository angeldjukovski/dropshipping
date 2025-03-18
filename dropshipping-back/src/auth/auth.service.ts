import { Injectable,BadRequestException,NotFoundException,InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserBack, UserDocument } from 'user/schema/user.schema';
import { MailService } from 'mail/mail.service';
import { RegisterDTO } from './dto/register.dto';
import { UserRole } from 'user/schema/user-role.enum';
import { LoginDTO } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenDtoResponse } from './dto/refresh-token-response.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'user/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt'
import { UserLoginDocument } from 'user/schema/user-login.schema';





@Injectable()
export class AuthService {
constructor(@InjectModel('users') private userModel:Model <UserDocument>, private jwtService: JwtService, private mailService : MailService,)  {}

async register(registerDTO: RegisterDTO): Promise<UserBack> {
  const { id, email, password, firstName, lastName } = registerDTO;
  const user = await this.userModel.findOne({ email }).exec();
  if (user) {
    throw new BadRequestException(`User with email ${email} already exists`);
  }
  const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
  const createdUser = await this.userModel.create({
    id,
    email,
    firstName,
    lastName,
    password: hashedPassword,
    role: registerDTO.role ?? UserRole.Costumer,
  });
  const userInstance = plainToInstance(User, createdUser.toObject());
  return userInstance;
}


async login (loginDTO : LoginDTO): Promise <RefreshTokenDtoResponse>   {
  const user = await this.userModel.findOne({email: loginDTO.email}).exec()
  if (!user) {
      throw new NotFoundException(`The ${loginDTO.email} is incorect`);
      }
  const isPasswordCorrect = await bcrypt.compare(
  loginDTO.password,
  user.password,
  );
  if(!isPasswordCorrect) {
  throw new BadRequestException('Invalid credentials')
  }
  const {token , refreshToken} = await this.generateTokens(user)
  return { token, refreshToken }
  }



async sendEmail (email : string,token:string): Promise <void> {
const user = await this.userModel.findOne({email}).exec ()
if (!user) {
throw new NotFoundException(`The ${email} is not correct`);
}
const  verifyLink = `http://localhost:4200/api/auth/forgot-password?token=${token}`
await this.mailService.sendMail(email, 'Rest Password', `To change your password please verify your email on the following link: ${verifyLink}`) 
}

async logout(userId: string, refreshToken: string): Promise<void> {
const user = await this.userModel.findOne({id:userId }).exec()

}

async forgetPassword(email:string, newpassword: string, token:string ):Promise<any> {
const decodedToken = this.jwtService.verify(token)
if(!decodedToken) {
throw new BadRequestException('Invalid Token')
}
const user = await this.userModel.findOne({email}).exec()
if(!user) {
throw new NotFoundException(`Incorrect email`)
}
const hashedPassword = await bcrypt.hash(newpassword, Number(process.env.BCRYPT_SALT));
await this.userModel.updateOne({email}, {password: hashedPassword})
return { message: 'Password updated successfully' };
}

private async generateTokens(user: UserDocument): Promise<{ token: string, refreshToken: string }> {
const payload = { email: user.email, sub: user.id, role: user.role ?? UserRole.Costumer };
console.log("JWT Secret in AuthService:", process.env.JWT_SECRET);
const token = this.jwtService.sign(payload, {expiresIn : '1h'});
const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
return { token, refreshToken };
}

async refreshToken(refreshTokenDTO:RefreshTokenDto): Promise <RefreshTokenDtoResponse>  {
const {userId,role} = this.jwtService.verify(refreshTokenDTO.refreshToken)

if(!role) {
throw new BadRequestException('Invalid Token')
}
const user = await this.userModel.findOne({id:userId}).exec()
if(!user) {
throw new  NotFoundException(`The user with id ${userId} has not be found`)
}
await this.validateUsersRefreshToken(refreshTokenDTO.refreshToken, user)
const {token,refreshToken} = await this.generateTokens(user)
await this.removeRefreshToken(user.id, refreshTokenDTO.refreshToken);
await this.addRefreshToken(user.id, refreshToken);
return { token, refreshToken };

}

private async validateUsersRefreshToken(token: string, user: any) : Promise<void> {
const isTokenValid: boolean = user.refreshTokens?.some((refreshToken: string) => refreshToken === token) || false;
if(!isTokenValid) {
throw new BadRequestException('Bad refresh Token')
}
}

private async addRefreshToken(userId: string , refreshToken:string):Promise<void>  {
const result = await this.userModel.updateOne({ _id: userId }, { $push: { refreshTokens: refreshToken } }).exec()
if (result.modifiedCount === 0) {
  console.log(`Refresh Token is Bad ${userId}`);
}
}
private async removeRefreshToken(userId : string, refreshToken: string): Promise<void> {
const result = await this.userModel.updateOne({ _id: userId }, { $pull: { refreshTokens: refreshToken } }).exec();
if (result.modifiedCount === 0) {
  console.log(`Refresh Token is Bad ${userId}`);
}
}
}
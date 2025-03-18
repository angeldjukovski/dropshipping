import { Controller,Post,Body,BadRequestException,NotFoundException,Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ForgetPasswordDTO } from './dto/forget-password.dto';
import {ApiBadRequestResponse, ApiResponse} from '@nestjs/swagger';
import { User } from 'user/dto/user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { RefreshTokenDtoResponse } from './dto/refresh-token-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserBack } from 'user/schema/user.schema';

@Controller('auth')
export class AuthController {
constructor( private authService : AuthService) {} 


@ApiBadRequestResponse({description: 'Returns bad request error if the email already exists',type: BadRequestException,})
@ApiResponse({description: 'User is registered', type: User})
@Post('register')
register(@Body() registerDto: RegisterDTO): Promise<UserBack> {
return this.authService.register(registerDto);
}

@ApiResponse({description: 'The Login is succesful', type: RefreshTokenDto})
@ApiBadRequestResponse({description: '',type: BadRequestException,})
@Post ('sign-in')
login (@Body() loginDTO: LoginDTO): Promise <RefreshTokenDtoResponse> {
return this.authService.login(loginDTO)
}
@ApiResponse({description: 'The Refresh Token Is Generated', type: RefreshTokenDtoResponse})
@Post('refresh-token') 
refreshToken (@Body() refreshTokenDTO : RefreshTokenDto,): Promise <RefreshTokenDtoResponse> {
return this.authService.refreshToken(refreshTokenDTO);
}
@ApiResponse({description: 'The Password is changed', type: User})
@Post('forgot-password')
async forgotPassword(@Query('token') token:string,  @Body() forgotPasswordDto: ForgetPasswordDTO): Promise<Omit<User, 'password'>> {
const { email, newpassword, } = forgotPasswordDto;
return this.authService.forgetPassword(email, newpassword,token);
}
@ApiResponse({description: 'The Password is changed', type: User})
@Post('verify-email')
async verifyEmail(@Body() verifyEmailDto: VerifyEmailDTO): Promise<void> {
const {email,token} = verifyEmailDto; 
await this.authService.sendEmail(email,token);
}

}

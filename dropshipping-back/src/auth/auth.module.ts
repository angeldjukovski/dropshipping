import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule} from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'user/schema/user.schema';
import { MailService } from 'mail/mail.service';
import { UserService } from 'user/user.service';
 import { UserController } from 'user/user.controller';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { RolesGuard } from 'common/guard/role.guard';


@Module({
  imports : [
  PassportModule,
  JwtModule.registerAsync ({
  imports : [ConfigModule],
  inject : [ConfigService],
  global: true,
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: '1h' },
  }),
  
  }),
  MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])
  ],
  providers: [AuthService, JwtStrategy, MailService, UserService, RolesGuard, JwtAuthGuard ],
  controllers: [AuthController, UserController],

})
export class AuthModule {}

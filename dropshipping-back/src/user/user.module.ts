import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { UserSchema } from './schema/user.schema';


@Module({
  imports : [
  MongooseModule.forFeature([{name:'users',schema: UserSchema}]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

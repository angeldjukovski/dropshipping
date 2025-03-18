import { Module } from '@nestjs/common';
import { EditProfileService } from './edit-profile.service';
import { EditProfileController } from './edit-profile.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { UserSchema } from 'user/schema/user.schema';


@Module({
  imports : [
  MongooseModule.forFeature([{name:'users',schema: UserSchema}]),
  ],
  controllers: [EditProfileController],
  providers: [EditProfileService]
})
export class EditProfileModule {}

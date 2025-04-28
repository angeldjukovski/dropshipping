import { EditProfileService } from "./edit-profile.service";
import { InjectModel } from '@nestjs/mongoose/dist';
import { Injectable, BadRequestException, NotFoundException, Controller, UseGuards, Get,UnauthorizedException,Put,Body } from '@nestjs/common';
import { GetUser } from 'common/decorator/current-user.decorator';
import { UserDocument } from "user/schema/user.schema";
import { JwtAuthGuard } from "common/guard/jwt-auth.guards";
import { UserEditDTO } from "user/dto/edit-user.dto";

@Controller('edit-profile')
@UseGuards(JwtAuthGuard)
export class EditProfileController {

constructor (private editProfileService : EditProfileService ) {}   

@Get() 
async getEditUser (@GetUser() user) : Promise <UserDocument[]> {
const id = user.sub
if (!id) {
throw new UnauthorizedException("User not authenticated");
}
console.log(`getting user data from user: ${id}`)
return this.editProfileService.getUser(id)
}


@Put ()
async editUser (@GetUser() user , @Body() editUserDTO : UserEditDTO): Promise <UserDocument> {
const id = user.sub 
if (!id) {
throw new UnauthorizedException("User not authenticated");
}
console.log(`Editing delivery for user: ${id}`);
return this.editProfileService.editUser(id,editUserDTO)
}
}



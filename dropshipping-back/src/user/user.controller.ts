import { Controller,Get,Post,Body,Patch,Param,Delete,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRoleDTO } from './dto/update.role.dto';
import { Role } from 'common/decorator/role.decorator.decorator';
import { UserRole } from './schema/user-role.enum';
import { RoleValidatorType } from 'common/type/role.validator.enum';
import { RolesGuard } from 'common/guard/role.guard';
import { GetUser} from 'common/decorator/current-user.decorator';
import { User } from './dto/user.dto';
import { CurrentUser } from 'common/type/current-user.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { plainToInstance } from 'class-transformer';


@UseGuards(JwtAuthGuard,RolesGuard)
@ApiTags("User")
@Controller('user')
export class UserController {

constructor(private readonly userService: UserService )  {}

@Role([UserRole.Admin],RoleValidatorType.HasAllOfThese)
@Post('/register')
create (@Body()  createUserDTO : CreateUserDTO) {
return this.userService.create(createUserDTO)
}

@Role([UserRole.Admin],RoleValidatorType.HasAllOfThese)
@Get()
findall () {
return this.userService.findAll()
}

@Role([UserRole.Costumer, UserRole.Admin, UserRole.Employee],RoleValidatorType.HasSomeOfThese)
@Get('/profile')
async findme(@GetUser() user: CurrentUser):Promise <User> {
console.log("Get User:", user);
const userResponse = await this.userService.findByEmail(user.email)
return plainToInstance(User, userResponse[0])
}

@Role ([UserRole.Admin],RoleValidatorType.HasAllOfThese)
@Get(':id')
findOne(@Param('id') id:string) {
return this.userService.findOneById(id)
}

@Role([UserRole.Admin], RoleValidatorType.HasAllOfThese) 
@Patch(':id')
updateUser (@Param ('id') id: string, @Body() updateUserDto : UpdateUserDTO) {
return this.userService.updateUser(id, updateUserDto)
}

@Role ([UserRole.Admin],RoleValidatorType.HasAllOfThese)
@Patch(':id/role')
updateRole(@Param('id') id:string,@Body() updateUserRole:UserRoleDTO) {
return this.userService.updateUserRole(id,updateUserRole)
}

@Role([UserRole.Admin],RoleValidatorType.HasAllOfThese)
@Delete(':id')
delete(@Param('id') id: string) {
return this.userService.delete(id)
}


}

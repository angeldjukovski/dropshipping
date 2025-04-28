import { Controller,Body,Post, UseGuards,Get,Put,Param, Delete, Patch, UnauthorizedException } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryDTO } from './dto/delivery.dto';
import { EditDeliveryDTO } from './dto/delivery.edit.dto';
import { GetUser } from 'common/decorator/current-user.decorator';
import { RolesGuard } from 'common/guard/role.guard';
import { Role } from 'common/decorator/role.decorator.decorator';
import { DeliveryBack } from './schema/delivery.schema';
import { DeliveryDocument } from './schema/delivery.schema';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { UserRole } from 'user/schema/user-role.enum';
import { RoleValidatorType } from 'common/type/role.validator.enum';


@Controller('delivery')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeliveryController {

constructor (private deliveryService : DeliveryService) {}


@Post()
async createDelivery (@GetUser() user, @Body() deliveryDTO : DeliveryDTO): Promise <DeliveryBack> {
const userId = user.sub
return await this.deliveryService.createDelivery({...deliveryDTO,userId});
}

@Get('/') 
async getDeliveryUser (@GetUser() user) : Promise <DeliveryDocument[]> {
const userId = user.sub
if (!userId) {
throw new UnauthorizedException("User not authenticated");
}
console.log(`getting delivery of user: ${userId}`)
return this.deliveryService.getDelivery(userId)
}

@Get('/deliveries-lists')
@Role([UserRole.Admin],RoleValidatorType.HasAllOfThese)
getAllDeliveries() : Promise <DeliveryDocument[]> {
return this.deliveryService.getAllDeliveries()
}

@Delete('/:id')
@Role([UserRole.Admin],RoleValidatorType.HasAllOfThese)
deleteDelivery(@Param('id') id : string): Promise <DeliveryDocument | null> {
return this.deliveryService.deleteDelivery(id)
}

@Patch('/:id')
@Role([UserRole.Admin],RoleValidatorType.HasAllOfThese)
updateDelivery(@Param('id') id : string, @Body() body ): Promise <DeliveryDocument> {
return this.deliveryService.updateDelivery(id,body)
}


@Put ()
async editDelivery (@GetUser() user , @Body() editDeliveryDTO : EditDeliveryDTO): Promise <DeliveryBack> {
const userId = user.sub 
if (!userId) {
throw new UnauthorizedException("User not authenticated");
}
console.log(`Editing delivery for user: ${userId}`);
return this.deliveryService.editDelivery(userId,editDeliveryDTO)
}
}

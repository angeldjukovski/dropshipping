import { Controller,Body,Post, UseGuards,Get,Put,Param, UnauthorizedException } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryDTO } from './dto/delivery.dto';
import { EditDeliveryDTO } from './dto/delivery.edit.dto';
import { GetUser } from 'common/decorator/current-user.decorator';
import { DeliveryBack } from './schema/delivery.schema';
import { DeliveryDocument } from './schema/delivery.schema';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';


@Controller('delivery')
@UseGuards(JwtAuthGuard)
export class DeliveryController {

constructor (private deliveryService : DeliveryService) {}


@Post()
async createDelivery (@GetUser() user, @Body() deliveryDTO : DeliveryDTO): Promise <DeliveryBack> {
const userId = user.sub
return await this.deliveryService.createDelivery({...deliveryDTO,userId});
}

@Get() 
async getDeliveryUser (@GetUser() user) : Promise <DeliveryDocument[]> {
const userId = user.sub
if (!userId) {
throw new UnauthorizedException("User not authenticated");
}
console.log(`getting delivery of user: ${userId}`)
return this.deliveryService.getDelivery(userId)
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

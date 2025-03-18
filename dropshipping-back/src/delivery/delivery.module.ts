import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliverySchema } from './schema/delivery.schema';


@Module({
  imports : [
  MongooseModule.forFeature([{name:'delivery',schema: DeliverySchema}])
  ],
  providers: [DeliveryService],
  controllers: [DeliveryController]
})
export class DeliveryModule {}

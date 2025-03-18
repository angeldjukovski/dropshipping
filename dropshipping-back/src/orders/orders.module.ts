import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { OrdersSchema } from './schema/orders.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{name:'orders',schema: OrdersSchema}])
    ],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}

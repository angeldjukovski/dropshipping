import { Module } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CostumerController } from './costumer.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { CostumerSchema } from './schema/costumer.schema';


@Module({
  imports : [
   MongooseModule.forFeature([{name:'users',schema: CostumerSchema}]),
  ],
  providers: [CostumerService],
  controllers: [CostumerController]
})
export class CostumerModule {}

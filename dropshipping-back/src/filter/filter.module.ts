import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilterSchema } from './schema/filter.schema';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';

@Module({
    imports: [
    MongooseModule.forFeature([{name:'book',schema: FilterSchema}]),
    ],
    controllers: [FilterController],
    providers: [FilterService],
    exports: [FilterService],
})
export class FilterModule {}

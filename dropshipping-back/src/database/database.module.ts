import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
imports: [
MongooseModule.forRoot('mongodb://localhost:27017/book-db'),
]
})
export class DataModule {}
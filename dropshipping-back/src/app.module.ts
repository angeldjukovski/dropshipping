import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FictionModule } from './book/fiction.module';
import { DataModule } from './database/database.module';
import { SearchModule } from '/search/search.module';
import { CostumerModule } from './costumer/costumer.module';
import { AuthModule } from 'auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BookDetailsModule } from 'book-details/book-details.module';
import { FilterModule } from 'filter/filter.module';
import { DeliveryModule } from './delivery/delivery.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersModule } from './orders/orders.module';
import { EditProfileModule } from 'edit-profile/edit-profile.module';
import { PaymentService } from './payment/payment.service';
import { PaymentController } from './payment/payment.controller';
import { PaymentModule } from './payment/payment.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { EmployeeModule } from './employee/employee.module';






@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost:27017/book-db'),
  ConfigModule.forRoot({ isGlobal: true }),
  FictionModule,
  DataModule,
  SearchModule,
  CostumerModule,
  AuthModule,
  CostumerModule,
  JwtModule,
  FilterModule,
  DeliveryModule,
  WishlistModule,
  OrdersModule,
  EditProfileModule,
  ProductModule,
  ContactUsModule,
  EmployeeModule

 

  ],
  
  
  
})
export class AppModule {}

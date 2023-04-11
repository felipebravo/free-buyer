import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/order/order.module';
import { DeliveryModule } from './modules/delivery/delivery.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    OrdersModule,
    DeliveryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

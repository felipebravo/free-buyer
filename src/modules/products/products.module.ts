import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaProductsRepository } from './repositories/prisma/products.prisma.repository';
import { ProductsRepository } from './repositories/products.repository';
import { OrdersRepository } from '../order/repositories/order.repository';
import { PrismaOrdersRepository } from '../order/repositories/prisma/order.prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    { provide: ProductsRepository, useClass: PrismaProductsRepository },
    { provide: OrdersRepository, useClass: PrismaOrdersRepository },
  ],
})
export class ProductsModule {}

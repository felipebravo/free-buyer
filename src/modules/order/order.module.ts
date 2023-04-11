import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { OrdersController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersRepository } from './repositories/order.repository';
import { PrismaOrdersRepository } from './repositories/prisma/order.prisma.repository';
import { DeliveriesRepository } from '../delivery/repositories/delivery.repository';
import { PrismaDeliveriesRepository } from '../delivery/repositories/prisma/delivery.prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [
    OrderService,
    PrismaService,
    { provide: OrdersRepository, useClass: PrismaOrdersRepository },
    { provide: DeliveriesRepository, useClass: PrismaDeliveriesRepository },
  ],
})
export class OrdersModule {}

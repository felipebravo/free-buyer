import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { PrismaService } from 'src/database/prisma.service';
import { DeliveriesRepository } from './repositories/delivery.repository';
import { PrismaDeliveriesRepository } from './repositories/prisma/delivery.prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    PrismaService,
    { provide: DeliveriesRepository, useClass: PrismaDeliveriesRepository },
  ],
})
export class DeliveryModule {}

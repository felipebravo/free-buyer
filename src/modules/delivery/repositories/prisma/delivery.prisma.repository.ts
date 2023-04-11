import { PrismaClient } from '@prisma/client';
import { DeliveriesRepository, iDeliveryOrder } from '../delivery.repository';
import { Delivery } from '../../entities/delivery.entity';
import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from '../../dto/create-delivery.dto';

@Injectable()
export class PrismaDeliveriesRepository implements DeliveriesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateDeliveryDto): Promise<Delivery> {
    const delivery = await this.prisma.delivery.create({ data });

    return delivery;
  }

  async findOne(id: string): Promise<iDeliveryOrder> {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id },
      include: { order: true },
    });

    return delivery;
  }

  async update(id: string): Promise<Delivery> {
    const deliveredOrder = await this.prisma.delivery.update({
      where: {
        id: id,
      },
      data: {
        is_delivered: true,
        delivery_date: new Date(),
      },
    });

    return deliveredOrder;
  }
}

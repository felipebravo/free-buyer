import { PrismaClient } from '@prisma/client';
import { OrdersRepository } from '../order.repository';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { Order } from '../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateOrderDto): Promise<Order> {
    const order = await this.prisma.order.create({ data });

    return order;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({ where: { id } });

    return plainToInstance(Order, order);
  }

  async update(id: string): Promise<Order> {
    const newOrder = await this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        is_accepted: true,
      },
    });

    return newOrder;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }

  async findRequests(id: string): Promise<Order[]> {
    const ordersToReceive = await this.prisma.order.findMany({
      where: { user_id: id },
    });

    return plainToInstance(Order, ordersToReceive);
  }

  async findToSend(id: string): Promise<Order[]> {
    const ordersToReceive = await this.prisma.order.findMany({
      where: { user_id: id },
    });

    return plainToInstance(Order, ordersToReceive);
  }
}

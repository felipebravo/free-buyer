import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DeliveriesRepository } from './repositories/delivery.repository';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(
    private deliveriesRepository: DeliveriesRepository,
    private prisma: PrismaClient,
  ) {}

  async findDeliveries(req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub as string;

    const deliveries = await this.prisma.delivery.findMany({
      include: { order: { include: { user: true } } },
    });
    const deliveriesToReceive = [];

    deliveries.forEach((delivery) => {
      if (delivery.order.user_id === userId) {
        deliveriesToReceive.push(delivery);
      }
    });

    return deliveriesToReceive;
  }

  async update(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub as string;

    const findDelivery = await this.deliveriesRepository.findOne(id);

    if (!findDelivery) {
      throw new NotFoundException('delivery not found');
    }

    if (findDelivery.order.user_id !== userId) {
      throw new UnauthorizedException(
        'you do not have permission to access this resource',
      );
    }
    if (findDelivery.is_delivered === true) {
      throw new BadRequestException('delivery has already been received');
    }

    const receivedDelivery = await this.deliveriesRepository.update(id);

    return receivedDelivery;
  }
}

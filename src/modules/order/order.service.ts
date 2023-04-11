import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Order, PrismaClient } from '@prisma/client';
import { OrdersRepository } from './repositories/order.repository';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { DeliveriesRepository } from '../delivery/repositories/delivery.repository';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private deliveriesRepository: DeliveriesRepository,
    private prisma: PrismaClient,
  ) {}

  async createOrder(createOrderDto, req: Request): Promise<Order> {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = decoded.sub as string;

    const productIds = createOrderDto.products.map(
      (product) => product.product_id,
    );

    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        is_available: true,
      },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('some products are unavailable');
    }

    products.forEach((product) => {
      if (product.user_id === user_id) {
        throw new BadRequestException('cannot buy product from yourself');
      }
    });

    for (let i = 0; i < products.length - 1; i++) {
      if (products[i].user_id !== products[i + 1].user_id) {
        throw new BadRequestException(
          'all products must belong to the same user',
        );
      }
    }

    const productsData = products.map((product) => ({
      id: product.id,
    }));

    const orderData = {
      ...createOrderDto,
      user_id,
      products: {
        connect: productsData,
      },
    };

    const order = await this.ordersRepository.create(orderData);

    await this.prisma.product.updateMany({
      where: {
        id: { in: productIds },
      },
      data: {
        is_available: false,
      },
    });

    return order;
  }

  async findRequests(req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub as string;

    return await this.ordersRepository.findRequests(userId);
  }

  async findToSend(req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub as string;

    const orders = await this.prisma.order.findMany({
      include: { products: { include: { user: true } } },
    });
    const ordersToSend = [];

    orders.forEach((order) => {
      order.products.forEach((product) => {
        if (product.user_id === userId && order.is_accepted === false) {
          if (!ordersToSend.includes(order)) {
            ordersToSend.push(order);
          }
        }
      });
    });

    return ordersToSend;
  }

  async findOne(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    if (userId === id) {
      const findUser = await this.ordersRepository.findOne(id);

      if (!findUser) {
        throw new NotFoundException('user not found');
      }

      return this.ordersRepository.findOne(id);
    }

    throw new UnauthorizedException(
      'you do not have permission to access this resource',
    );
  }

  async update(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub as string;

    const findOrder = await this.ordersRepository.findOne(id);

    if (!findOrder) {
      throw new NotFoundException('order not found');
    }

    if (findOrder.user_id === userId) {
      throw new UnauthorizedException(
        'you do not have permission to access this resource',
      );
    }

    if (findOrder.is_accepted === true) {
      throw new BadRequestException('order has already been accepted');
    }

    const acceptedOrder = await this.ordersRepository.update(id);

    if (acceptedOrder) {
      const deliveryOrder = await this.deliveriesRepository.create({
        order_id: acceptedOrder.id,
      });

      return deliveryOrder;
    }
  }

  async delete(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub as string;

    const findOrder = await this.ordersRepository.findOne(id);

    if (!findOrder) {
      throw new NotFoundException('order not found');
    }

    if (userId !== findOrder.user_id) {
      throw new UnauthorizedException(
        'you do not have permission to access this resource',
      );
    }

    return this.ordersRepository.delete(id);
  }
}

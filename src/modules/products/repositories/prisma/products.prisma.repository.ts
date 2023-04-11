import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from '../../dto/create-product.dto';
import { Product } from '../../entities/product.entity';
import { ProductsRepository } from '../products.repository';
import { plainToInstance } from 'class-transformer';
import { Order } from 'src/modules/order/entities/order.entity';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateProductDto): Promise<Product> {
    const product = await this.prisma.product.create({ data });

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    return plainToInstance(Product, products);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return plainToInstance(Product, product);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }

  async findOrderByProduct(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({ where: { id } });

    return order;
  }
}

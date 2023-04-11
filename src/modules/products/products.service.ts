import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductsRepository } from './repositories/products.repository';
import { OrdersRepository } from '../order/repositories/order.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.create(createProductDto);
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findOne(id: string) {
    const findProduct = await this.productsRepository.findOne(id);

    if (!findProduct) {
      throw new NotFoundException('product not found');
    }

    return this.productsRepository.findOne(id);
  }

  async delete(id: string) {
    const findProduct = await this.productsRepository.findOne(id);

    if (!findProduct) {
      throw new NotFoundException('product not found');
    }

    return this.productsRepository.delete(id);
  }

  async findOrderByProduct(id: string) {
    const findProduct = await this.productsRepository.findOne(id);

    if (!findProduct) {
      throw new NotFoundException('product not found');
    }

    if (!findProduct.order_id) {
      throw new NotFoundException('order not found');
    }

    const findOrder = await this.ordersRepository.findOne(findProduct.order_id);

    return findOrder;
  }
}

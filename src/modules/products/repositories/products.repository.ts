import { Order } from 'src/modules/order/entities/order.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';

export abstract class ProductsRepository {
  abstract create(data: CreateProductDto): Promise<Product> | Product;
  abstract findAll(): Promise<Product[]> | [];
  abstract findOne(id: string): Promise<Product | undefined> | Product;
  abstract delete(id: string): Promise<void> | void;
  abstract findOrderByProduct(id: string): Promise<Order | undefined> | Order;
}

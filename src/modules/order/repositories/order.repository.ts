import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

export abstract class OrdersRepository {
  abstract create(data: CreateOrderDto): Promise<Order> | Order;
  abstract findOne(id: string): Promise<Order | undefined> | Order;
  abstract update(id: string): Promise<Order | undefined> | Order;
  abstract delete(id: string): Promise<void> | void;
  abstract findRequests(id: string): Promise<Order[]> | [];
  abstract findToSend(id: string): Promise<Order[]> | [];
}

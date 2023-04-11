import { randomUUID } from 'node:crypto';
import { Product } from 'src/modules/products/entities/product.entity';

export class Order {
  readonly id: string;
  readonly order_date: Date;
  user_id: string;
  readonly is_accepted: boolean;
  readonly products?: Product[];

  constructor() {
    this.id = randomUUID();
    this.order_date = new Date();
  }
}

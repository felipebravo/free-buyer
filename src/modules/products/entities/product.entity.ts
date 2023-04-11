import { randomUUID } from 'node:crypto';

export class Product {
  readonly id: string;
  user_id: string;
  product_name: string;
  order_id: string;
  readonly is_available: boolean;

  constructor() {
    this.id = randomUUID();
  }
}

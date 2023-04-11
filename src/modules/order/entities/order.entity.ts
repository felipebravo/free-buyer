import { randomUUID } from 'node:crypto';

export class Order {
  readonly id: string;
  readonly order_date: Date;
  user_id: string;
  readonly is_accepted: boolean;

  constructor() {
    this.id = randomUUID();
    this.order_date = new Date();
  }
}

import { randomUUID } from 'node:crypto';

export class Delivery {
  readonly id: string;
  readonly delivery_date: Date;
  order_id: string;
  readonly is_delivered: boolean;

  constructor() {
    this.id = randomUUID();
    this.delivery_date = new Date();
  }
}

import { randomUUID } from 'node:crypto';

export class Address {
  readonly id: string;
  zip_code: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number: number;

  constructor() {
    this.id = randomUUID();
  }
}

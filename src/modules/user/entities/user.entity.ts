import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { Address } from 'src/modules/address/entities/address.entity';

export class User {
  readonly id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  address: Address;

  constructor() {
    this.id = randomUUID();
  }
}

import { CreateAddressDto } from '../dto/create-address.dto';
import { Address } from '../entities/address.entity';

export abstract class AddressRepository {
  abstract create(data: CreateAddressDto): Promise<Address> | Address;
}

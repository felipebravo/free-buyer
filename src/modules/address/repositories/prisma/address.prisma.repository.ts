import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../../dto/create-address.dto';
import { PrismaService } from 'src/database/prisma.service';
import { AddressRepository } from '../address.repository';
import { Address } from '../../entities/address.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAddressDto): Promise<Address> {
    const address = new Address();

    Object.assign(address, { ...data });

    const newAddress = await this.prisma.address.create({
      data: { ...address },
    });

    return plainToInstance(Address, newAddress);
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import axios from 'axios';
import { AddressRepository } from '../address/repositories/address.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UsersRepository,
    private addressRepository: AddressRepository,
  ) {}
  //: Promise<User>
  async createUser(createUserDto) {
    const findUser = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );

    if (findUser) {
      throw new ConflictException('email already exists');
    }

    const { address, ...user } = createUserDto;

    const addressRes = await axios.get(
      `https://viacep.com.br/ws/${address.zip_code}/json`,
    );
    const { cep, logradouro, bairro, localidade, uf } = addressRes.data;

    const fullAddress = {
      zip_code: cep.replace('-', ''),
      city: localidade,
      state: uf,
      district: bairro,
      street: logradouro,
      number: address.number,
    };

    const createdAddress = await this.addressRepository.create(fullAddress);

    const fullUser = { ...user, address: { ...createdAddress } };

    return await this.userRepository.create(fullUser);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findUserByEmail(email: string) {
    const findUser = await this.userRepository.findUserByEmail(email);

    return findUser;
  }

  async findOne(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    if (userId === id) {
      const findUser = await this.userRepository.findOne(id, req);

      if (!findUser) {
        throw new NotFoundException('user not found');
      }

      return this.userRepository.findOne(id, req);
    }

    throw new UnauthorizedException(
      'you do not have permission to access this resource',
    );
  }

  async deleteUser(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    if (userId === id) {
      const findUser = await this.userRepository.findOne(id, req);

      if (!findUser) {
        throw new NotFoundException('user not found');
      }

      return this.userRepository.delete(id);
    }

    throw new UnauthorizedException(
      'you do not have permission to access this resource',
    );
  }
}

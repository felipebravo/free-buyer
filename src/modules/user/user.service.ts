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

@Injectable()
export class UserService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const findUser = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );

    if (findUser) {
      throw new ConflictException('email already exists');
    }

    const user = await this.userRepository.create(createUserDto);

    return user;
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

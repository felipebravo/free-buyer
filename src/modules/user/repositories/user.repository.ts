import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  abstract findAll(): Promise<User[]> | [];
  abstract findOne(id: string, req): Promise<User | undefined> | User;
  abstract delete(id: string): Promise<void> | void;
  abstract findUserByEmail(email: string): Promise<User | undefined> | User;
}

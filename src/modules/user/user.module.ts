import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './repositories/user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaUsersRepository } from '../user/repositories/prisma/user.prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [UserService],
})
export class UserModule {}

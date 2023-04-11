import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signupUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.userService.findOne(id, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.userService.deleteUser(id, req);
  }
}

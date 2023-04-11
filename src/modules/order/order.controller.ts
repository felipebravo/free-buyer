import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Patch,
  Body,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() orderToCreate, @Req() req) {
    return this.orderService.createOrder(orderToCreate, req);
  }

  @Get('to-receive')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findRequests(@Req() req: Request) {
    return this.orderService.findRequests(req);
  }

  @Get('to-send')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findToSend(@Req() req: Request) {
    return this.orderService.findToSend(req);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateOrder(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.orderService.update(id, req);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.orderService.delete(id, req);
  }
}

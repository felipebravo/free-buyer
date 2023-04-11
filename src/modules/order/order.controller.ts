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

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() orderToCreate, @Req() req) {
    return this.orderService.createOrder(orderToCreate, req);
  }

  @Get('to-receive')
  @UseGuards(JwtAuthGuard)
  async findRequests(@Req() req: Request) {
    return this.orderService.findRequests(req);
  }

  @Get('to-send')
  @UseGuards(JwtAuthGuard)
  async findToSend(@Req() req: Request) {
    return this.orderService.findToSend(req);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  updateOrder(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.orderService.update(id, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.orderService.delete(id, req);
  }
}

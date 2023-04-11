import { Controller, Get, Param, Req, Patch, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { DeliveryService } from './delivery.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findDeliveries(@Req() req: Request) {
    return this.deliveryService.findDeliveries(req);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async orderDelivered(@Param('id') id: string, @Req() req: Request) {
    return this.deliveryService.update(id, req);
  }
}

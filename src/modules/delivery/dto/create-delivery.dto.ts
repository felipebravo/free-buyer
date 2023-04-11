import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  order_id: string;
}

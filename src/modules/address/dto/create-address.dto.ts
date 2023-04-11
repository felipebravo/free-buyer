import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @IsString()
  @IsNotEmpty()
  readonly city?: string;

  @IsString()
  @IsNotEmpty()
  readonly state?: string;

  @IsString()
  @IsNotEmpty()
  readonly district?: string;

  @IsString()
  @IsNotEmpty()
  readonly street?: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  number: number;
}

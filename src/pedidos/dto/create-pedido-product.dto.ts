import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePedidoProductDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly pedidoId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdatePedidoProductDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly pedidoId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly productIds: number[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly prices: number[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantities: number[];
}

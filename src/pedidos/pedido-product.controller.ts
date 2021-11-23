import { Controller, Post, Body } from '@nestjs/common';
import { PedidoProductService } from './pedido-product.service';
import { CreatePedidoProductDto } from './dto/create-pedido-product.dto';

@Controller('pedido-product')
export class PedidoProductController {
  constructor(private readonly pedidoProductService: PedidoProductService) {}

  @Post()
  create(@Body() payload: CreatePedidoProductDto) {
    return this.pedidoProductService.create(payload);
  }
}

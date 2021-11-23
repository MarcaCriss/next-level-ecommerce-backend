import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoProduct } from './entities/pedido-product.entity';
import { Pedido } from './entities/pedido.entity';
import { UserModule } from '../user/user.module';
import { PedidoProductController } from './pedido-product.controller';
import { PedidoProductService } from './pedido-product.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoProduct]),
    UserModule,
    ProductsModule,
  ],
  controllers: [PedidosController, PedidoProductController],
  providers: [PedidosService, PedidoProductService],
})
export class PedidosModule {}

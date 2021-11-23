import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoProduct } from './entities/pedido-product.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CreatePedidoProductDto } from './dto/create-pedido-product.dto';

@Injectable()
export class PedidoProductService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
    @InjectRepository(PedidoProduct)
    private pedidoProductRepository: Repository<Pedido>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(data: CreatePedidoProductDto) {
    const pedido = await this.pedidoRepository.findOne(data.pedidoId);
    const product = await this.productRepository.findOne(data.productId);
    const pedidoProduct = new PedidoProduct();
    pedidoProduct.pedido = pedido;
    pedidoProduct.product = product;
    pedidoProduct.name = data.name;
    pedidoProduct.quantity = data.quantity;
    pedidoProduct.price = data.price;
    return await this.pedidoProductRepository.save(pedidoProduct);
  }
}

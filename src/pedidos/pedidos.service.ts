import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(data: CreatePedidoDto) {
    const pedido = new Pedido();
    if (data.user) {
      const user = await this.userRepository.findOne(data.user);
      pedido.user = user;
    }
    return this.pedidoRepository.save(pedido);
  }

  async findAll() {
    return await this.pedidoRepository.find({
      relations: ['user', 'products'],
    });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne(id, {
      relations: ['products', 'user'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido #${id} no se encontro`);
    }
    return pedido;
  }

  async findAllByUser(id: number) {
    return await this.pedidoRepository.find({
      where: { user: id },
      relations: ['user', 'products'],
      order: {
        createAt: 'DESC',
      },
    });
  }
}

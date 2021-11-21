import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['category', 'photos'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['category', 'photos'],
    });
    if (!product) {
      throw new NotFoundException(`Producto #${id} no se encontro`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    await this.findOne(id);
    return await this.productRepository.update(id, changes);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.productRepository.delete(id);
  }
}

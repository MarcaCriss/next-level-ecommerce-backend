import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly productsService: ProductsService,
  ) {}

  async findAll() {
    return await this.photoRepository.find({ relations: ['product'] });
  }

  async create(createPhotoDto: CreatePhotoDto) {
    const photo = this.photoRepository.create(createPhotoDto);
    if (createPhotoDto.productId) {
      const product = await this.productsService.findOne(
        createPhotoDto.productId,
      );
      photo.product = product;
    }
    return await this.photoRepository.save(photo);
  }

  async findOne(id: number) {
    const photo = await this.photoRepository.findOne(id);
    if (!photo) return new NotFoundException('No se encontro la foto');
    return photo;
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    const photo = this.findOne(id);
    const photoUpdate = Object.assign(photo, updatePhotoDto);
    return await this.photoRepository.save(photoUpdate);
  }

  async remove(id: number) {
    return await this.photoRepository.delete(id);
  }

  async getPhotoByProduct(productId: number) {
    const products = await this.photoRepository.find({
      where: { product: productId },
    });
    return products;
  }
}

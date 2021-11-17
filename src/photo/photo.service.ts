import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll() {
    return await this.photoRepository.find();
  }

  async create(createPhotoDto: CreatePhotoDto) {
    const photo = this.photoRepository.create(createPhotoDto);
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
}

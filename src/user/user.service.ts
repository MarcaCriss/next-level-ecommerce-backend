import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entities';

export interface UserFindOne {
  id?: number;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUser() {
    return await this.userRepository.find();
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('No existe el usuario');
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({ email: dto.email });
    if (userExists)
      throw new BadRequestException(
        'Ya existe un usuario registrado con ese email',
      );

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);
    delete user.password;
    return user;
  }

  async updateUser(id: number, dto: EditUserDto) {
    const user = await this.getUser(id);
    const updatedUser = Object.assign(user, dto);
    const userUpdated = await this.userRepository.save(updatedUser);
    delete userUpdated.password;
    return userUpdated;
  }

  async deleteUser(id: number) {
    const user = await this.getUser(id);
    return await this.userRepository.remove(user);
  }

  async getUserByEmail(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}

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

  async getUser(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne(id)
      .then((u) =>
        !userEntity ? u : !!u && userEntity.id === u.id ? u : null,
      );

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

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

  async updateUser(id: number, dto: EditUserDto, userEntity?: User) {
    const user = await this.getUser(id, userEntity);
    const updatedUser = Object.assign(user, dto);
    const userUpdated = await this.userRepository.save(updatedUser);
    delete userUpdated.password;
    return userUpdated;
  }

  async deleteUser(id: number, userEntity?: User) {
    const user = await this.getUser(id, userEntity);
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

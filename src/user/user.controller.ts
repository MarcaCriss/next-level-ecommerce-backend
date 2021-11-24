import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from './../common/decorators';
import { User } from './../common/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, EditUserDto } from './dtos';
import { UserService } from './user.service';
import { User as UserEntity } from './entities/user.entity';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { UpdateNumeroDto } from './dtos/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get(':id')
  async getUser(@Param() id: number) {
    return await this.userService.getUser(id);
  }

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    const data = await this.userService.createUser(dto);
    return { message: 'User creado', data };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() dto: EditUserDto,
    @User() user: UserEntity,
  ) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // esto es un admin
      data = await this.userService.updateUser(id, dto);
    } else {
      // esto es un author
      const { roles, ...rest } = dto;
      data = await this.userService.updateUser(id, rest, user);
    }
    return { message: 'User edited', data };
  }

  @Put(':id/numero')
  async updateUserNumber(
    @Param('id') id: number,
    @Body() data: UpdateNumeroDto,
  ) {
    return await this.userService.updateUserNumber(id, data);
  }

  @Auth({
    action: 'delete',
    possession: 'own',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: number, @User() user: UserEntity) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // esto es un admin
      data = await this.userService.deleteUser(id);
    } else {
      // esto es un author
      data = await this.userService.deleteUser(id, user);
    }
    return { message: 'User deleted', data };
  }
}

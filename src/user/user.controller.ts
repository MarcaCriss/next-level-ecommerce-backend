import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from './../common/decorators';
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

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get(':id')
  async getUser(@Param() id: number) {
    return await this.userService.getUser(id);
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    const data = await this.userService.createUser(dto);
    return { message: 'User creado', data };
  }

  @Auth()
  @Put(':id')
  async updateUser(@Param() id: number, @Body() dto: EditUserDto) {
    const data = await this.userService.updateUser(id, dto);
    return { message: 'User actualizado', data };
  }

  @Auth()
  @Delete(':id')
  async deleteUser(@Param() id: number) {
    const data = await this.userService.deleteUser(id);
    return { message: 'User eliminado', data };
  }
}

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { AppResource } from '../app.roles';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Auth({
    action: 'create',
    possession: 'any',
    resource: AppResource.PRODUCT,
  })
  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.productsService.create(payload);
  }

  @Auth({
    action: 'update',
    possession: 'any',
    resource: AppResource.PRODUCT,
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(+id, payload);
  }

  @Auth({
    action: 'delete',
    possession: 'any',
    resource: AppResource.PRODUCT,
  })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(+id);
  }
}

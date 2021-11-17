import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { MulterConfigService } from './multer-config/multer-config.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    TypeOrmModule.forFeature([Photo]),
    ProductsModule,
  ],
  controllers: [PhotoController],
  providers: [PhotoService, MulterConfigService],
})
export class PhotoModule {}

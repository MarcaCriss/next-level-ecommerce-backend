import { CreatePhotoDto } from './dto/create-photo.dto';
import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  Res,
  UploadedFile,
  UploadedFiles,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { PhotoService } from './photo.service';

@ApiTags('Fotos')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image: Express.Multer.File) {
    const response = {
      originalName: image.originalname,
      filename: image.filename,
    };
    return response;
  }

  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('images', 5))
  async uploadMultipleFiles(@UploadedFiles() images: Express.Multer.File[]) {
    const response = [];
    images.forEach((image) => {
      const imageResponse = {
        originalName: image.originalname,
        filename: image.filename,
      };
      response.push(imageResponse);
    });
    return response;
  }

  @Post('create')
  createPhoto(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Get(':productId/products')
  getPhotoByProduct(@Param('productId') productId: number) {
    return this.photoService.getPhotoByProduct(productId);
  }

  @Get(':imgpath')
  getImage(@Param('imgpath') image: string, @Res() res: any) {
    return res.sendFile(image, { root: './uploads' });
  }

  @Get('')
  getAllPhotos() {
    return this.photoService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}

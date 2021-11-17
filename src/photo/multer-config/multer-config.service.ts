import { filename, fileFilter } from './../../common/helpers/file-upload';
import { Injectable } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: filename,
      }),
      fileFilter: fileFilter,
    };
  }
}

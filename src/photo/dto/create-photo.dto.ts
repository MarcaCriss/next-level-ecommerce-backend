import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;
}

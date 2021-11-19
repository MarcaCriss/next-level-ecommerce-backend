import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
  IsEnum,
} from 'class-validator';
import { AppRoles } from './../../app.roles';
import { EnumToString } from 'src/common/helpers/enumToString';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un string' })
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El apellido debe ser un string' })
  @MaxLength(255)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener como minimo 8 carateres' })
  @MaxLength(128)
  password: string;

  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: `Debe ser un rol valido, ${EnumToString(AppRoles)}`,
  })
  roles: string[];
}

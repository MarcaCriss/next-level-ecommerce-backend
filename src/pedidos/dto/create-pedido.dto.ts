import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { User } from '../../user/entities/user.entity';
export class CreatePedidoDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly user: User;
}

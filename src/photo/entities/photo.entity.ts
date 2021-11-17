import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  @IsNotEmpty()
  name: string;
}

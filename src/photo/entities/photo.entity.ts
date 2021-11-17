import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => Product, (product) => product.photos)
  product: Product;
}

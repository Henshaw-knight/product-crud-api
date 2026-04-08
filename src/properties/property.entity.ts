import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  colour: string;

  @Column()
  weight: string;

  @ManyToOne(() => Product, (product) => product.properties, {
    onDelete: 'CASCADE',
  })
  product: Product;
}

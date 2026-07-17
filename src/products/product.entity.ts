import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Property } from '../properties/property.entity';
import { Category } from '../categories/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  inStock: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  rating: number;

  @OneToMany(() => Property, (property) => property.product, {
    cascade: true,
    eager: true,
  })
  properties: Property[];

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    nullable: true,
  })
  category: Category;

  @ManyToOne(() => User, (user) => user.products, { eager: false })
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

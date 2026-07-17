import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Seed default categories (if no category exist)
  async onModuleInit(): Promise<void> {
    const count = await this.categoriesRepository.count();
    if (count === 0) {
      const defaultCategories = [
        {
          name: 'Electronics',
          description: 'Electronic devices and accessories',
        },
        { name: 'Clothing', description: 'Apparel and fashion items' },
        { name: 'Books', description: 'Physical and digital books' },
        { name: 'Accessories', description: 'Fashion and tech accessories' },
        {
          name: 'Home & Garden',
          description: 'Home improvement and garden supplies',
        },
        { name: 'Sports', description: 'Sports and outdoor equipment' },
      ];

      await this.categoriesRepository.save(defaultCategories);
      console.log('Default categories seeded');
    }
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOne(id: number): Promise<Category | null> {
    return this.categoriesRepository.findOne({ where: { id } });
  }
}

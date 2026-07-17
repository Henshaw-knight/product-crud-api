import { Injectable, NotFoundException } from '@nestjs/common';
// import { Product } from './products.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['owner', 'category'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['owner', 'category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(dto: CreateProductDto, owner: User): Promise<Product> {
    const category = await this.categoriesService.findOne(dto.categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const { categoryId, ...productData } = dto;
    const product = this.productsRepository.create({
      ...productData,
      category,
      owner,
    });
    return this.productsRepository.save(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.categoriesService.findOne(dto.categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const { categoryId, ...rest } = dto;
      Object.assign(product, { ...rest, category });
    } else {
      Object.assign(product, dto);
    }

    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return { message: `Product with id ${id} has been deleted` };
  }
}

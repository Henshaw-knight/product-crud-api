import { Injectable, NotFoundException } from '@nestjs/common';
// import { Product } from './products.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['owner'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(productData: CreateProductDto, owner: User): Promise<Product> {
    const product = this.productsRepository.create({ ...productData, owner });
    return this.productsRepository.save(product);
  }

  async update(id: number, productData: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, productData);
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return { message: `Product with id ${id} has been deleted` };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones',
      price: 199.99,
      stock: 45,
      createdAt: new Date('2026-01-10'),
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      description: 'RGB backlit, tactile switches',
      price: 129.99,
      stock: 30,
      createdAt: new Date('2026-02-14'),
    },
    {
      id: 3,
      name: 'USB-C Hub',
      description: '7-in-1 multiport adapter',
      price: 49.99,
      stock: 100,
      createdAt: new Date('2026-03-01'),
    },
  ];

  private idCounter = 4;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(productData: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.idCounter++,
      ...productData,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, productData: UpdateProductDto): Product {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = {
      ...this.products[index],
      ...productData,
    };
    return this.products[index];
  }

  remove(id: number): { message: string } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
    return { message: `Product with id ${id} has been deleted` };
  }
}

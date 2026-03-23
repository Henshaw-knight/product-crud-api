import { CreateProductDto } from './create-product.dto';

export interface Product extends CreateProductDto {
  id: number;
  createdAt: Date;
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreatePropertyDto } from 'src/properties/create-property.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @IsInt()
  @IsNotEmpty()
  categoryId: number; // foreign key reference to Category

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePropertyDto)
  properties?: CreatePropertyDto[];
}

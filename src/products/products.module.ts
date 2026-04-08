import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { UsersModule } from 'src/users/users.module';
import { Property } from 'src/properties/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Property]), UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
// AuthMiddleware no longer needed as JWTAuthGuard now protects routes
export class ProductsModule {}

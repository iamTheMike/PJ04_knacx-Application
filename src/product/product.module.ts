import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entities';


@Module({
  imports: [
     TypeOrmModule.forFeature([User,Product],"knacx"),
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}

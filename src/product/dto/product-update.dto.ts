import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './product-create.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Updated Laptop',
  })
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Updated high-performance laptop',
  })
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'Product price',
    example: 899,
  })
  readonly price?: number;

  @ApiPropertyOptional({
    description: 'Product stock',
    example: 30,
  })
  readonly stock?: number;

  @ApiPropertyOptional({
    description: 'Product image URL',
    example: 'https://example.com/images/updated-laptop.jpg',
  })
  readonly image?: string;
}

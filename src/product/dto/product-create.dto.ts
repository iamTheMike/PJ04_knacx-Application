import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Laptop',
  })
  @IsString({ message: 'Product name must be a string' })
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'A high-performance laptop',
  })
  @IsOptional()
  @IsString({ message: 'Product description must be a string' })
  @IsNotEmpty({ message: 'Product description cannot be empty' })
  readonly description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 999,
  })
  @IsInt({ message: 'Product price must be a number' })
  @IsNotEmpty({ message: 'Product price cannot be empty' })
  readonly price: number;

  @ApiProperty({
    description: 'Product stock',
    example: 50,
  })
  @IsInt({ message: 'Product stock must be a number' })
  @IsNotEmpty({ message: 'Product stock cannot be empty' })
  readonly stock: number;

  @ApiPropertyOptional({
    description: 'Product image URL',
    example: 'https://example.com/images/laptop.jpg',
  })
  @IsOptional()
  @IsString({ message: 'Product image must be a string' })
  @IsNotEmpty({ message: 'Product image cannot be empty' })
  readonly image?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'ID of the product',
    example: 1,
  })
  @IsInt({ message: 'Product ID must be a number' })
  @IsNotEmpty({ message: 'Product ID cannot be empty' })
  readonly productId: number;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 2,
  })
  @IsInt({ message: 'Quantity must be a number' })
  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  readonly quantity: number;

  @ApiProperty({
    description: 'Price of the product',
    example: 100,
  })
  @IsInt({ message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price cannot be empty' })
  readonly price: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Name of the customer placing the order',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Customer name cannot be empty' })
  customerName: string;

  @ApiProperty({
    description: 'List of items in the order',
    type: [CreateOrderItemDto],
  })
  @IsArray({ message: 'Items must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}

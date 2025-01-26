/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { Response } from 'express';



@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }


    @Get()
    async getProducts() {
        return await this.productService.findAll();
    }

    @Post()
    async addProduct(@Body() CreateProductDto: CreateProductDto) {
        return await this.productService.createProduct(CreateProductDto);
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: number, @Body() UpdateProductDto: UpdateProductDto) {
        return await this.productService.updateProducts(id, UpdateProductDto)
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
        return await this.productService.deleteProduct(id);
    }

    @Get('export')
    async exportProducts(@Res() res: Response) {
        return await this.productService.exportProductsToCSV(res);
        

    }
}



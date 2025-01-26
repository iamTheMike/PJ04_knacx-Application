/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags("Products")
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @ApiOperation({ summary: "Get All Product" })
    @ApiOkResponse({ description: "Show all products data" })
    @Get()
    async getProducts() {
        return await this.productService.findAll();
    }

    @ApiOperation({ summary: "Create Product" })
    @ApiCreatedResponse({ description: "Show all products data" })
    @ApiBadRequestResponse({ description: "Invalid data provided" })
    @ApiConflictResponse({ description: "Product name already exists" })
    @Post()
    async addProduct(@Body() CreateProductDto: CreateProductDto) {
        return await this.productService.createProduct(CreateProductDto);
    }

    @ApiOperation({ summary: "Update Product By Product ID" })
    @ApiBody({
        description: 'Update Product',
        type: UpdateProductDto,
        required: true,
    })
    @ApiOkResponse({ description: "Show all products data" })
    @ApiNotFoundResponse({ description: "Product not found" })
    @ApiConflictResponse({ description: "Product name already exists" })
    @ApiBadRequestResponse({ description: "Invalid data provided" })
    @Patch(':id')
    async updateProduct(@Param('id') id: number, @Body() UpdateProductDto: UpdateProductDto) {
        return await this.productService.updateProducts(id, UpdateProductDto)
    }

    @ApiOperation({ summary: "Delete Product By Product ID" })
    @ApiOkResponse({ description: "Show all products data" })
    @ApiNotFoundResponse({ description: "Product not found" })
    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
        return await this.productService.deleteProduct(id);
    }

    @ApiOperation({ summary: "Export Product data as CSV file" })
    @ApiOkResponse({ description: "Download csv file" })
    @ApiBadRequestResponse({ description: "Product data is emty" })
    @Get('export')
    async exportProducts(@Res() res: Response) {
        return await this.productService.exportProductsToCSV(res);
    }
}



import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('product')
export class ProductController {
    constructor(private readonly productService : ProductService){}

    @CacheKey('products')
    @Get()
    async getProducts (){
        console.log("INSIDE CONTROLLER..")
        return await  this.productService.findAll();
    }
}

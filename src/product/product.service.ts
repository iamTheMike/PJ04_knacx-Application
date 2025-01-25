import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entities';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
    constructor  (
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @Inject('CACHE_MANAGER')
        private cacheManager: Cache
    ) {
     
    }

    async findAll () {
       console.log('INSIDE SERVICE....')
       const productData = await this.productRepository.find() ;
       await this.cacheManager.set ('products',productData)
       return productData
    }


}

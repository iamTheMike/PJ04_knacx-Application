import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entities';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { User } from 'src/auth/entities/auth.entities';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product, "knacx")
        private productRepository: Repository<Product>,

        @Inject('CACHE_MANAGER')
        private cacheManager: Cache
    ) { }

    async findAll() {
        await this.cacheManager.del('products');
        const cacheData = await this.cacheManager.get('products');
        if (cacheData) {
            console.log('Get CacheData');
            return cacheData;
        }
        const productData = await this.productRepository.find();
        await this.cacheManager.set('products', productData);
        console.log('Get MySQLData');
        return productData;
    }

    async createProduct(productDto: CreateProductDto) {
        const create = this.productRepository.create(productDto);
        const product = [await this.productRepository.save(create)];
        await this.cacheManager.del('products');
        const cacheData: CreateProductDto[] | null = await this.cacheManager.get('products')
        let createProduct: CreateProductDto[] = [];
        if (cacheData) {
            createProduct = cacheData;
            createProduct.push(product[0])
            await this.cacheManager.set('products', createProduct);
        } else {
            const productData = await this.productRepository.find();
            createProduct = productData;
            await this.cacheManager.set('products', createProduct);
        }
        return createProduct
    }

    async updateProducts(id: number, productDto: UpdateProductDto) {
        const update = await this.productRepository.update(id, productDto)
        if (update.affected === 0) {
            console.log("Product not found");
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }
        await this.cacheManager.del('products');
        const product = [await this.productRepository.findOne({ where: { id } })] as CreateProductDto[];
        const cacheData: CreateProductDto[] | null = await this.cacheManager.get('products')
        let createProduct: CreateProductDto[] = [];
        if (cacheData) {
            createProduct = cacheData;
            createProduct.push(product[0])
            await this.cacheManager.set('products', createProduct);
        } else {
            const productData = await this.productRepository.find();
            createProduct = productData;
            await this.cacheManager.set('products', createProduct);
        }
        return createProduct
    }

    async deleteProduct(id:number){
        const deleteProduct = await this.productRepository.delete({id})
        if (deleteProduct.affected === 0) {
            console.log("Product not found");
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }
        await this.cacheManager.del('products');
        const cacheData: User[] | null = await this.cacheManager.get('products')
        let createProduct: User[] | UpdateProductDto[] = [];
        if (cacheData) {
            const newCacheData = cacheData.filter(product => product.id !== id)
            console.log(newCacheData)
            createProduct =newCacheData;
            await this.cacheManager.set('products', createProduct);
        } else {
            const productData = await this.productRepository.find();
            createProduct = productData;
            await this.cacheManager.set('products', createProduct);
        }
        return createProduct
    }

}

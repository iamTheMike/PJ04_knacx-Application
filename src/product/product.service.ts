/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entities';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Parser } from 'json2csv'
import { Response } from 'express';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product, "knacx")
        private productRepository: Repository<Product>,

        @Inject('CACHE_MANAGER')
        private cacheManager: Cache
    ) { }

    async findAll(): Promise<Product[]> {
        const cacheData: Product[] | null = await this.cacheManager.get('products');
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
        let product;
        try {
            const create = this.productRepository.create(productDto);
            product = [await this.productRepository.save(create)];
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new HttpException("Product name already exists", HttpStatus.CONFLICT);
            }
            console.log(error)
            throw new HttpException("An error occurred while creating the product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const cacheData: CreateProductDto[] | null = await this.cacheManager.get('products')
        let createProduct: CreateProductDto[] = [];
        if (cacheData) {
            console.log('Get CacheData');
            createProduct = cacheData;
            createProduct.push(product[0])
            await this.cacheManager.set('products', createProduct);
        } else {
            console.log('Get MySQLData');
            const productData = await this.productRepository.find();
            createProduct = productData;
            await this.cacheManager.set('products', createProduct);
        }
        return createProduct
    }

    async updateProducts(id: number, productDto: UpdateProductDto) {
        let update;
        try {
            update = await this.productRepository.update(id, productDto)
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new HttpException("Product name already exists", HttpStatus.CONFLICT);
            }
            console.log(error)
            throw new HttpException("An error occurred while creating the product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (update.affected === 0) {
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }

        const newProduct = { ...await this.productRepository.findOne({ where: { id } }) };
        const cacheData: Product[] | null = await this.cacheManager.get('products')
        let createProduct: Product[] | UpdateProductDto[] = [];
        if (cacheData) {
            console.log('Get cahceData');
            const updatedCacheData = cacheData.map((product) => {
                if (product.id === Number(id)) {
                    return newProduct
                } else {
                    return product
                }
            });
            createProduct = updatedCacheData;
            await this.cacheManager.set('products', createProduct);

        } else {
            console.log('Get MySQLData');
            const productData = await this.productRepository.find();
            createProduct = productData;
            await this.cacheManager.set('products', createProduct);
        }
        return createProduct
    }

    async deleteProduct(id: number) {
        console.log(id)
        const deleteProduct = await this.productRepository.delete({ id })
        if (deleteProduct.affected === 0) {
            console.log("Product not found");
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }
        const cacheData: Product[] | null = await this.cacheManager.get('products')
        let createProduct: Product[] | UpdateProductDto[] = [];
        if (cacheData) {
            console.log('Get cahceData');
            const newCacheData = cacheData.filter(product => product.id !== Number(id))
            createProduct = newCacheData;
            await this.cacheManager.set('products', createProduct);
        } else {
            console.log('Get MySQLData');
            const productData = await this.productRepository.find();
            createProduct = productData;
            await this.cacheManager.set('products', createProduct);
        }
        return createProduct
    }

    async exportProductsToCSV(res: Response) {
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'exportCSV'))) {
            fs.mkdirSync(path.join(__dirname, '..', '..', 'exportCSV'));
        }
        const filePath = path.join(__dirname, '..', '..', 'exportCSV', 'products.csv');
        const products: Product[] = await this.findAll();
        if (products.length === 0) {
            throw new HttpException("Product is empty", HttpStatus.BAD_REQUEST)
        }
        const jsonCsvParser = new Parser();
        const csv = jsonCsvParser.parse(products);
        fs.writeFileSync(filePath, csv,)
        res.attachment("products.csv");
        res.status(200).send(csv)
    }

}

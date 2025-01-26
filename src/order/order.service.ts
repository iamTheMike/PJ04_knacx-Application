import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order,"knacx_orders")
        private orderRepository : Repository<Order>
    ){}
    
    async findAllOrder(){
        const orders = await this.orderRepository.find();
        return orders
    }


}

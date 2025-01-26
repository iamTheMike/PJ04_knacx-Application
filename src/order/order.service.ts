/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entities';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order.item.entities';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order, "knacx_orders")
        private orderRepository: Repository<Order>,

        @InjectRepository(OrderItem, "knacx_orders")
        private oderItemRepository: Repository<OrderItem>,

    ) { }

    async findAllOrder() {
        const orders = await this.orderRepository.find();
        return orders
    }


    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const { customerName, items } = createOrderDto;

        const totalPrice = items.reduce((sum, item) => {
            return sum += item.price * item.quantity
        }, 0)
        const order = {
            customerName,
            totalPrice,
            createAt: new Date()
        }
        const saveOrder = this.orderRepository.create(order);
        const newOrder = await this.orderRepository.save(saveOrder);

        for (const item of items) {
            const newItem = {
                ...item,
                order:newOrder,
            };
            const saveOrderItem = this.oderItemRepository.create(newItem);
            await this.oderItemRepository.save(saveOrderItem);
        }
        return saveOrder

    }





}

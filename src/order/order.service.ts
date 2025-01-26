/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entities';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from './entities/order.item.entities';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order, "knacx_orders")
        private orderRepository: Repository<Order>,

  

        @InjectDataSource('knacx_orders')
        private dataSource: DataSource


    ) { }

    async findAllOrder() {
        return await this.orderRepository.find()
    }



    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.dataSource.transaction(async (manager) => {
            const { customerName, items } = createOrderDto;

            const totalPrice = items.reduce((sum, item) => {
                return sum += item.price * item.quantity
            }, 0)

            const createOrder = manager.create(Order,{
                customerName,
                totalPrice
            })
            const order = await manager.save(createOrder);

            const orderItem = items.map((item)=>{
              return  manager.create(OrderItem,{
                    ...item,
                    order
                })
            })
            await manager.save(orderItem)

            return order

        })


    }

}







// const totalPrice = items.reduce((sum, item) => {
//     return sum += item.price * item.quantity
// }, 0)
// const order = {
//     customerName,
//     totalPrice,
//     createAt: new Date()
// }
// const saveOrder = this.orderRepository.create(order);
// const newOrder = await this.orderRepository.save(saveOrder);

// for (const item of items) {
//     const newItem = {
//         ...item,
//         order: newOrder,
//     };
//     const saveOrderItem = this.oderItemRepository.create(newItem);
//     await this.oderItemRepository.save(saveOrderItem);
// }
// return saveOrder
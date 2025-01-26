import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService : OrderService){}

    @Get()
    async getOrder(){
        return await this.orderService.findAllOrder();
    }

    @Post()
    async createOrder(@Body()createOrderDto : CreateOrderDto){
        return await this.orderService.createOrder(createOrderDto);
    }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags("Order")
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @ApiOperation({ summary: "Get all Orders" })
    @ApiOkResponse({ description: "Get all data" })
    @Get()
    async getOrder() {
        return await this.orderService.findAllOrder();
    }

    @ApiOperation({ summary: "Create order include auto generate orderItem" })
    @ApiOkResponse({ description: "Get all data" })
    @ApiBadRequestResponse({ description: "Invalid data provided" })
    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return await this.orderService.createOrder(createOrderDto);
    }
}

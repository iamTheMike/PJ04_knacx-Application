import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entities';
import { OrderItem } from './entities/order.item.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Order,OrderItem],"knacx_orders")],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

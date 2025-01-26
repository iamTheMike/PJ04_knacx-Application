import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Order } from './order.entities';
import { IsNotEmpty } from 'class-validator';


@Entity('order_items')
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @IsNotEmpty({ message: 'cannot empty' })
  order: Order;

  @Column()
  @IsNotEmpty({ message: 'cannot empty' })
  productId: number;

  @Column()
  @IsNotEmpty({ message: 'cannot empty' })
  quantity: number;

  @Column({type:'float',precision: 10, scale: 2 })
  @IsNotEmpty({ message: 'cannot empty' })
  price: number;
}

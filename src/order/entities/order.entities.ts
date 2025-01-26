import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order.item.entities";
import { IsNotEmpty } from "class-validator";



@Entity('orders')
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn()
    @IsNotEmpty({ message: 'cannot empty' })
    id: number;
  
    @Column()
    @IsNotEmpty({ message: 'cannot empty' })
    customerName: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    @IsNotEmpty({ message: 'cannot empty' })
    totalPrice: number;
  
    @CreateDateColumn()
    @IsNotEmpty({ message: 'cannot empty' })
    createdAt: Date;
  
    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    @IsNotEmpty({ message: 'cannot empty' })
    items: OrderItem[];
}
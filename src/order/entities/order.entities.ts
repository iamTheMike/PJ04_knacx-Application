import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order.item.entities";



@Entity('orders')
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    customerName: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    items: OrderItem[];
}
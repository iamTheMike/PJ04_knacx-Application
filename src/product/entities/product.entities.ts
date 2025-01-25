import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: null, nullable: true})
    description?:  string ;

    @Column({type:'float',precision: 10, scale: 2 })
    price: number;

    @Column({type:'int', default: 0})
    stock: number;

    @Column({default: null, nullable: true})
    image: string ;
}


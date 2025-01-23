import { BaseEntity, BeforeInsert, Column,  Entity,  PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';


@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;
    
    @Column()
    refreshToken?: string;
  

    @BeforeInsert()
    async hashpassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

}
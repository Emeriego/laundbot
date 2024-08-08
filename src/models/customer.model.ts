import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Shop } from './shop.model';
import { Order } from './order.model';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Shop, (shop) => shop.customers)
  shops: Shop[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}

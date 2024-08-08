import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Order } from './order.model';
import { Treatment } from './treatment.model';
import { Item } from './item.model';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.orderItems)
  item: Item;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToMany(() => Treatment)
  @JoinTable()
  treatments: Treatment[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Customer } from "./customer.model";
import { Package } from "./package.model";
import { OrderItem } from "./orderItem.model";
import { Shop } from "./shop.model";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Column()
  status: string;

  @ManyToOne(() => Package, (pkg) => pkg.orders)
  package: Package;

  @ManyToOne(() => Shop, (shop) => shop.orders)
  shop: Shop;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP + INTERVAL 3 DAY'})
  deliveryDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

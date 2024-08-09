import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.model';
import { Package } from './package.model';
import { Customer } from './customer.model';
import { Order } from './order.model';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.shops)
  user: User;

  @OneToMany(() => Package, (pkg) => pkg.shop)
  packages: Package[];

  @OneToMany(() => Order, (order) => order.shop)
  orders: Order[];

  @ManyToMany(() => Customer, (customer) => customer.shops)
  @JoinTable()
  customers: Customer[];

  @Column()
  location: string;

  @Column()
  phone: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

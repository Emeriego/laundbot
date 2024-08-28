import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { User } from './user.model';
import { Package } from './package.model';
import { Customer } from './customer.model';
import { Order } from './order.model';
import { Item } from './item.model';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // Change ManyToOne to OneToOne to restrict one user to one shop
  @OneToOne(() => User, (user) => user.shop)
  @JoinColumn() // This decorator indicates the owning side of the relationship
  user: User;

  @OneToMany(() => Package, (pkg) => pkg.shop)
  packages: Package[];

  @OneToMany(() => Order, (order) => order.shop)
  orders: Order[];

  @OneToMany(() => Item, (item) => item.shop)
  items: Item[];

  @ManyToMany(() => Customer, (customer) => customer.shops)
  @JoinTable()
  customers: Customer[];

  @Column({type: 'text', default: 'https://via.placeholder.com/150'})
  imageUrl: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  phone: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

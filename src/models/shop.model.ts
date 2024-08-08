import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.model';
import { Package } from './package.model';
import { Customer } from './customer.model';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.shops)
  user: User;

  @OneToMany(() => Package, (pkg) => pkg.shop)
  packages: Package[];

  @ManyToMany(() => Customer, (customer) => customer.shops)
  @JoinTable()
  customers: Customer[];
}

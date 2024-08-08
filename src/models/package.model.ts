import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Shop } from "./shop.model";
import { Treatment } from "./treatment.model";
import { Order } from "./order.model";

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Shop, (shop) => shop.packages)
  shop: Shop;

  @OneToMany(() => Treatment, (treatment) => treatment.package)
  treatments: Treatment[];

  @OneToMany(() => Order, (order) => order.package)
  orders: Order[];
}

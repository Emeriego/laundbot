import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Shop } from "./shop.model";
import { Treatment } from "./treatment.model";
import { Order } from "./order.model";

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Shop, (shop) => shop.packages)
  shop: Shop;

  @OneToMany(() => Treatment, (treatment) => treatment.package)
  treatments: Treatment[];

  @OneToMany(() => Order, (order) => order.package)
  orders: Order[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

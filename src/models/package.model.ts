import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Shop } from './shop.model';
import { Treatment } from './treatment.model';
import { OrderItem } from './orderItem.model';

@Entity()
export class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Shop, (shop) => shop.packages)
  shop: Shop;

  @ManyToMany(() => Treatment, (treatment) => treatment.packages)
  treatments: Treatment[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.package)
  orderItems: OrderItem[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  orders: any;
}

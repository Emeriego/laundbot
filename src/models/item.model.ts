import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './orderItem.model';
import { TreatmentCost } from './treatmentCost.model';
import { Shop } from './shop.model';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Shop, (shop) => shop.items) // Add relationship to Shop
  shop: Shop;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  orderItems: OrderItem[];

  @OneToMany(() => TreatmentCost, (treatmentCost) => treatmentCost.item)
  treatmentCosts: TreatmentCost[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

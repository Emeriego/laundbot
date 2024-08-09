import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './orderItem.model';
import { TreatmentCost } from './treatmentCost.model';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  orderItems: OrderItem[];

  @OneToMany(() => TreatmentCost, (treatmentCost) => treatmentCost.item)
  treatmentCosts: TreatmentCost[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

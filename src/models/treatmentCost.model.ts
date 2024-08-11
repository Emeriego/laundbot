import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Treatment } from './treatment.model';
import { Item } from './item.model';

@Entity()
export class TreatmentCost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Treatment, (treatment) => treatment.treatmentCosts)
  treatment: Treatment;

  @ManyToOne(() => Item, (item) => item.treatmentCosts)
  item: Item;

  @Column('decimal')
  cost: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Package } from './package.model';
import { TreatmentCost } from './treatmentCost.model';

@Entity()
export class Treatment {
  
  @Column({ primary: true })
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Package, (pkg) => pkg.treatments)
  @JoinTable() // This decorator specifies that this side of the relationship owns the join table
  packages: Package[];

  @OneToMany(() => TreatmentCost, (treatmentCost) => treatmentCost.treatment)
  treatmentCosts: TreatmentCost[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

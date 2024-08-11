import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Package } from './package.model';
import { TreatmentCost } from './treatmentCost.model';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Package, (pkg) => pkg.treatments)
  package: Package;

  @OneToMany(() => TreatmentCost, (treatmentCost) => treatmentCost.treatment)
  treatmentCosts: TreatmentCost[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

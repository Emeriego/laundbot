import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Package } from './package.model';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  cost: number;

  @ManyToOne(() => Package, (pkg) => pkg.treatments)
  package: Package;
}

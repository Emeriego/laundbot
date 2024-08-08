import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shop } from './shop.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Shop, (shop) => shop.user)
  shops: Shop[];
}

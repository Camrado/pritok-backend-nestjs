import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  created_at: Date;

  @Column('varchar', { length: 30 })
  username: string;

  @Column('varchar', { length: 70, unique: true })
  email: string;

  @Column('boolean', { default: false })
  is_verified: boolean;

  @Column('varchar')
  password: string;

  @Column('varchar', { length: 36, nullable: true })
  verification_code: string;

  @OneToMany(type => Category, category => category.customer)
  categories: Category[];

  @OneToMany(type => Purchase, purchase => purchase.customer)
  purchases: Purchase[];
}
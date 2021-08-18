import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Unique, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
@Unique(['category_name', 'customer_id'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  category_name: string;

  @Column('varchar', { length: 300, default: '' })
  description: string;

  @Column('integer')
  customer_id: number;

  @ManyToOne(type => Customer, customer => customer.categories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(type => Purchase, purchase => purchase.customer)
  purchases: Purchase[];
}
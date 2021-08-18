import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  purchase_date: Date;

  @Column('integer')
  category_id: number;

  @Column('varchar', { length: 30 })
  product: string;

  @Column('numeric')
  price: number;

  @Column('integer')
  quantity: number;

  @Column('numeric')
  total_price: number;

  @Column('integer')
  customer_id: number;

  @ManyToOne(type => Category, category => category.purchases, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'category_id'})
  category: Category

  @ManyToOne(type => Customer, customer => customer.purchases, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {

}
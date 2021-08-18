import { EntityRepository, Repository } from 'typeorm';
import { Purchase } from './purchase.entity';

@EntityRepository(Purchase)
export class PurchasesRepository extends Repository<Purchase>{

}
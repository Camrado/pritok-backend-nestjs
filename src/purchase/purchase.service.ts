import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PurchasesRepository } from './purchases.repository';
import { Customer } from '../customer/customer.entity';
import { Purchase } from './purchase.entity';
import { Message } from '../interfaces/message.interface';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PurchaseService {
  constructor(private purchasesRepository: PurchasesRepository, private categoryService: CategoryService) {
  }

  async getAllPurchases(customer: Customer): Promise<Purchase[]> {
    return this.purchasesRepository.find({ customer });
  }

  async getPurchaseById(id: number, customer: Customer): Promise<Purchase> {
    const purchase = await this.purchasesRepository.findOne({ id, customer });
    if (!purchase) throw new NotFoundException(`Purchase with ID '${id}' doesn't exist.`);

    return purchase;
  }

  async createPurchase(createPurchaseDto: CreatePurchaseDto, customer: Customer): Promise<Message> {
    const category = await this.categoryService.getCategoryById(createPurchaseDto.category_id, customer);
    if (!category) throw new BadRequestException(`Category with ID '${createPurchaseDto.category_id}' doesn't exist.`);

    await this.purchasesRepository.insert({ ...createPurchaseDto, customer });
    return { statusCode: 201, message: 'New purchase has been successfully created.' };
  }

  async deletePurchase(id: number, customer: Customer): Promise<Message> {
    const result = await this.purchasesRepository.delete({ id, customer });
    if (result.affected === 0) throw new NotFoundException(`Purchase with ID '${id}' doesn't exist.`);

    return { statusCode: 200, message: 'Purchase has been successfully deleted.' };
  }

  async updatePurchase(updatePurchaseDto: UpdatePurchaseDto, customer: Customer): Promise<Message> {
    const { id, product, category_id, price, quantity } = updatePurchaseDto;

    if (!product && !price && !category_id && !quantity) throw new BadRequestException('Nothing to update');

    if (!await this.purchasesRepository.findOne({ id, customer })) {
      throw new NotFoundException(`Purchase with ID '${id}' doesn't exist.`);
    }

    delete updatePurchaseDto.id;
    await this.purchasesRepository.update({ id, customer }, updatePurchaseDto);
    return { statusCode: 200, message: 'Purchase has been successfully updated.' };
  }
}

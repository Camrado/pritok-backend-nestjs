import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfirmedAccountGuard } from '../customer/confirmed-account.guard';
import { PurchaseService } from './purchase.service';
import { GetCustomer } from '../customer/get-customer.decorator';
import { Message } from '../interfaces/message.interface';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('purchase')
@UseGuards(AuthGuard(), ConfirmedAccountGuard)
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {
  }

  @Get()
  getAllPurchases(@GetCustomer() customer): Promise<Purchase[]> {
    return this.purchaseService.getAllPurchases(customer);
  }

  @Get(':id')
  getPurchaseById(@Param('id', ParseIntPipe) id: number, @GetCustomer() customer): Promise<Purchase> {
    return this.purchaseService.getPurchaseById(id, customer);
  }

  @Post()
  createPurchase(@Body() createPurchaseDto: CreatePurchaseDto, @GetCustomer() customer): Promise<Message> {
    return this.purchaseService.createPurchase(createPurchaseDto, customer);
  }

  @Delete(':id')
  deletePurchase(@Param('id', ParseIntPipe) id: number, @GetCustomer() customer): Promise<Message> {
    return this.purchaseService.deletePurchase(id, customer);
  }

  @Patch()
  updatePurchase(@Body() updatePurchaseDto: UpdatePurchaseDto, @GetCustomer() customer): Promise<Message> {
    return this.purchaseService.updatePurchase(updatePurchaseDto, customer);
  }
}

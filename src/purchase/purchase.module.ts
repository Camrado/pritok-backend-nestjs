import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasesRepository } from './purchases.repository';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasesRepository]), AuthModule, CategoryModule],
  providers: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {
}

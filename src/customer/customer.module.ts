import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersRepository } from './customers.repository';
import { AuthModule } from '../auth/auth.module';
import { ConfirmedAccountGuard } from './confirmed-account.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomersRepository]),
    forwardRef(() => AuthModule),
  ],
  providers: [CustomerService, ConfirmedAccountGuard],
  controllers: [CustomerController],
  exports: [TypeOrmModule.forFeature([CustomersRepository]), CustomerService, ConfirmedAccountGuard],
})
export class CustomerModule {
}

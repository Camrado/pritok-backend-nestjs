import { Body, Controller, Delete, Get, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';
import { GetCustomer } from './get-customer.decorator';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Message } from '../interfaces/message.interface';

@Controller('customer')
@UseGuards(AuthGuard())
export class CustomerController {
  constructor(private customerService: CustomerService) {
  }

  @Get('info')
  getCustomerInfo(@GetCustomer() customer) {
    delete customer.password;
    return customer;
  }

  @Patch('change-username')
  changeUsername(@Body() changeUsernameDto: ChangeUsernameDto, @GetCustomer() customer): Promise<Message> {
    return this.customerService.changeUsername(changeUsernameDto, customer);
  }

  @Patch('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @GetCustomer() customer): Promise<Message> {
    return this.customerService.changePassword(changePasswordDto, customer);
  }

  @Get('send-confirmation-email')
  sendConfirmationEmail(@GetCustomer() customer): Promise<Message> {
    return this.customerService.sendVerificationEmail(customer);
  }

  @Post('confirm-account')
  confirmAccount(@Body('code', ParseUUIDPipe) code: string, @GetCustomer() customer): Promise<Message> {
    return this.customerService.confirmAccount(code, customer);
  }

  @Delete('delete-my-account')
  deleteMyAccount(@GetCustomer() customer): Promise<Message> {
    return this.customerService.deleteMyAccount(customer);
  }
}

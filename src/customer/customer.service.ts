import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { Customer } from './customer.entity';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { Message } from '../interfaces/message.interface';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { emailConfirmationForm } from './email-confirmation-form';

@Injectable()
export class CustomerService {
  constructor(private customersRepository: CustomersRepository) {
  }

  async changeUsername({ username }: ChangeUsernameDto, customer: Customer): Promise<Message> {
    customer.username = username;
    await this.customersRepository.save(customer);

    return { statusCode: 200, message: 'Your username has been successfully updated.' };
  }

  async changePassword({ currentPassword, newPassword }: ChangePasswordDto, customer: Customer): Promise<Message> {
    if (await bcrypt.compare(currentPassword, customer.password)) {
      const salt = await bcrypt.genSalt();
      customer.password = await bcrypt.hash(newPassword, salt);
      await this.customersRepository.save(customer);

      return { statusCode: 200, message: 'Your password has been successfully updated.' };
    } else {
      throw new BadRequestException('Current password is not correct.');
    }
  }

  async sendVerificationEmail(customer: Customer): Promise<Message> {
    if (customer.is_verified) throw new BadRequestException('You\'ve already confirmed your account.');
    const code = uuidv4();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_MAIL_PASSWORD,
      },
    });

    customer.verification_code = code;
    await this.customersRepository.save(customer);

    await transporter.sendMail(emailConfirmationForm(customer, code));

    return { statusCode: 200, message: 'Confirmation email has been successfully sent to your email.' };
  }

  async confirmAccount(code, customer: Customer): Promise<Message> {
    if (customer.is_verified) throw new BadRequestException('You\'ve already confirmed your account.');
    if (code !== customer.verification_code) throw new BadRequestException('Confirmation code is not correct.');

    customer.verification_code = null;
    customer.is_verified = true;
    await this.customersRepository.save(customer);

    return { statusCode: 200, message: 'Account has been successfully confirmed.' };
  }

  async deleteMyAccount(customer: Customer): Promise<Message> {
    await this.customersRepository.remove(customer);
    return { statusCode: 200, message: 'Your account has been successfully deleted.' };
  }
}

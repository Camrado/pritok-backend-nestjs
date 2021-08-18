import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersRepository } from '../customer/customers.repository';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Customer } from '../customer/customer.entity';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AuthService {
  constructor(private customersRepository: CustomersRepository, private jwtService: JwtService, private customerService: CustomerService) {
  }

  async signUp(signUpDto: SignUpDto): Promise<object> {
    const { email, password } = signUpDto;

    // Checking if customer with the given email exists
    const doesCustomerExists = await this.customersRepository.findOne({ email });
    if (doesCustomerExists) {
      throw new ConflictException(`Customer with the email '${email}' already exists.`);
    }

    // Hashing password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = this.customersRepository.create({ ...signUpDto, password: hashedPassword });
    await this.customersRepository.save(customer);

    const confirmEmailMessage = await this.customerService.sendVerificationEmail(customer);

    return { ...this.createToken(customer), ...confirmEmailMessage };
  }

  async signIn({ email, password }: SignInDto): Promise<{ accessToken: string }> {
    const customer = await this.customersRepository.findOne({ email });

    if (customer && (await bcrypt.compare(password, customer.password))) {
      return this.createToken(customer);
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }

  createToken({ id, email }: Customer): { accessToken: string } {
    const payload: JwtPayload = { id, email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomersRepository } from '../customer/customers.repository';
import { Customer } from '../customer/customer.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private customersRepository: CustomersRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ id, email }: JwtPayload): Promise<Customer> {
    const customer = await this.customersRepository.findOne({ id, email });
    if (!customer) throw new UnauthorizedException();

    return customer;
  }
}
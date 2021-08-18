import { Customer } from './customer.entity';

export const emailConfirmationForm = (customer: Customer, code) => {
    return {
      from: `Pritok - Email Confirmation <${process.env.MY_MAIL}>`,
      to: customer.email,
      subject: 'Email Confirmation',
      text: `Hi ${customer.username},

We hope this finds you well!

Thank you for signing up with our service! Before we move on to the good stuff, there’s just one more step for you to take.

Copy the code below and paste it in our site to confirm your subscription and we’ll take it from there -

${code}

We hope to see you on the other side,

Thanks and regards,

Pritok Corporation.`,
    };
  }
;
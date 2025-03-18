import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';


@Injectable()
export class PaymentService {
  private stripe: Stripe;

constructor(private configService : ConfigService)  {
this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY') , {
apiVersion : '2025-02-24.acacia'
})
}

async createCharge(token: string, amount: number) {
  try {
    const charge = await this.stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: 'USD',
      source: token,
      description: 'Book Purchase',
    });
    return charge;
  } catch (error: any) {
    throw new BadRequestException('Payment failed: ' + error.message);
  }
}

}
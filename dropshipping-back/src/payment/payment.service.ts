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

async createCharge(paymentMethodID: string, currency: string, amount: number) {
  try {
    const paymentIntents = await this.stripe.paymentIntents.create({
      amount: Math.round(Number (amount.toFixed(2)) *100),
      currency: currency,
      payment_method: paymentMethodID,
      confirm: true,
      automatic_payment_methods : {
      enabled: true,
      allow_redirects: 'never',
      }
      
    });
    return paymentIntents;
  } catch (error: any) {
    throw new BadRequestException('Payment failed: ' + error.message);
  }
}

}
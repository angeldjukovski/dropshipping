import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { PaymentService } from '../shared/payment.service';
import { DeliveryService } from '../shared/delivery.service';
import { AuthService } from '../shared/auth.service';
import { Book } from '../../types/book.interface';
import { Delivery } from '../../types/delivery.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, CommonModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: { book: Book, quantity: number }[] = [];
  totalPrice = 0;
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: any;
  isProcessing = false;
  cardError: string | null = null;
  isStripeInitialized = false;
  paymentForm! : FormGroup 
  userId : string = ''
  deliveryExists: boolean = false;
  deliveryData : Delivery | null = null

  constructor(private cartService: CartService, private paymentService: PaymentService, private formBuilder : FormBuilder, private deliveryService : DeliveryService, private authService:AuthService) {}

  async ngOnInit(): Promise<void> {
    this.authService.getMe().subscribe((user: any) => {
      if (user) {
        this.userId = user.id;
        this.cartService.cartItems$.subscribe((items: any) => {
          this.cartItems = items;
          this.updatedPrice();
          this.elementsForm();
          this.getDeliveryData();
        });
      }
    });
  }

  async ngAfterViewInit()  {
  this.createStripe()
  }

  private async createStripe() {
    try {
      this.stripe = await loadStripe("pk_test_51R33jAGSADDLJ3hbwR4pfHuupk7iI114pMcumcQueJXAp0jtL9lfgRYmF4ZEyocYGLYBUZCS7E4jnSL2raFp6hQH00Qr8B30HE");

      if (!this.stripe) {
        throw new Error('Stripe failed to load');
      }

      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');
      const cardContianer = document.getElementById('card-element')
       
      if(cardContianer){
        this.cardElement.mount('#card-element');
        this.isStripeInitialized = true;
        console.log(' Stripe is loaded successfully');
      }
    } catch (error) {
      console.error(' Stripe failed to initialize:', error);
    }
  }
  

  updatedPrice(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeBooks(bookId: string): void {
    this.cartService.removeBooks(bookId);
    this.updatedPrice();
  }

  updateBooks(bookId: string, event: Event): void {
    const quantity = Number((event.target as HTMLInputElement).value);
    if (quantity >= 0) {
      this.cartService.updatedPrice(bookId, quantity);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.totalPrice = 0;
  }

  async placeOrder(): Promise<void> {
    if (this.cartItems.length === 0) {
      console.log('You dont have any orders');
      return;
    }
    this.isProcessing = true;
    this.cardError = null;

    if (!this.isStripeInitialized || !this.stripe || !this.cardElement) {
      console.error(' Stripe is not loaded properly');
      this.isProcessing = false;
      return;
    }

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error || !paymentMethod) {
      console.error(' Payment error:', error?.message);
      this.cardError = error?.message || 'Payment failed. Try again.';
      this.isProcessing = false;
      return;
    }

    this.paymentService.processPayment(this.cartItems, this.totalPrice, paymentMethod.id).subscribe({
      next: (response: any) => {
        console.log(' The Payment Is Successful:', response);
        this.cartService.clearCart();
        this.isProcessing = false;
      },
      error: (err) => {
        console.error(' The Payment failed:', err);
        this.isProcessing = false;
      },
    });
  }
   
   elementsForm() : void {
    this.paymentForm = this.formBuilder.group ({
    name:['', ],
     email:['',],
     phoneNumber:['',],
     address : ['',],
     zipcode : ['',],
     cardNumber : ['',],
   })

}
getDeliveryData(): void {
  console.log('UserId',this.userId)
  this.deliveryService.getDelivery(this.userId).subscribe({
    next: (delivery: Delivery | null) => {
      if (delivery) {
        console.log('the delivery data is fetched',delivery)
        this.deliveryData = delivery;
        this.deliveryExists = true;
        this.paymentForm.patchValue({
          name: delivery.name,
          email: delivery.email,
          phoneNumber: delivery.phoneNumber,
          address: delivery.address,
          zipcode: delivery.zipcode,
        });
      }
    },
    error: (err: any) => {
      console.error('Error fetching delivery details:', err);
    },
  });
}
}
import { Component } from '@angular/core';
import { CommonModule,CurrencyPipe } from '@angular/common';
import { Book } from '../../types/book.interface';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  orderItems: {book:Book,quantity:number}[] = []
  totalPrice = 0;


constructor(private cartService : CartService, private router :Router)  {}

 ngOnInit() : void {
 this.cartService.cartItems$.subscribe((items) => {
 this.orderItems = items 
 this.updatedPrice()
 })
 }
 
 updatedPrice(): void {
  this.totalPrice = this.cartService.getTotalPrice()
  }

  removeBooks(bookId:string) : void {
    this.cartService.removeBooks(bookId)
    this.updatedPrice()
    }
  
  placeOrder() : void {
  if (this.orderItems.length === 0)
  console.log('you dont have any orders')
  return
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../types/book.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
private cartItems = new BehaviorSubject<{book: Book, quantity: number}[]>([])
private bookAddCount: Record <string, number> = {}
cartItems$ = this.cartItems.asObservable()

addBooksToCheckout(book: Book): void {
const currentCart = [...this.cartItems.value]
const addedItems = currentCart.find((item) => item.book.id === book.id)
if(addedItems) {
addedItems.quantity += 1;
}else {
currentCart.push({book, quantity: 1})
}
this.bookAddCount[book.id] = (this.bookAddCount[book.id] || 0) + 1
this.cartItems.next(currentCart)  
}

}
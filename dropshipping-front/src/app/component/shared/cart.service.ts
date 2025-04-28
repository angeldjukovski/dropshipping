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

addBooks(book: Book): void {
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
removeBooks(bookId : string): void {
const currentCart = this.cartItems.value.filter ((item) => item.book.id !== bookId);
delete this.bookAddCount[bookId]
this.cartItems.next(currentCart)
}
getTotalPrice( ):number {
return this.cartItems.value.reduce((total, item) => total + item.book.price * item.quantity,0); 
}
updatedPrice(bookId : string, quantity: number) : void {
const currentCart = [...this.cartItems.value]
const existingItem = currentCart.find((item) => item.book.id === bookId)

if(existingItem) {
if (quantity > 0) {
existingItem.quantity = quantity

} else {
this.removeBooks(bookId)
}
}
this.cartItems.next(currentCart)
}
clearCart(): void {
this.cartItems.next([])
this.bookAddCount = {}
}



}
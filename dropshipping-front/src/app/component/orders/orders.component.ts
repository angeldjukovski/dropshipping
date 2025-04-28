import { Component,ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { DeliveryService } from '../shared/delivery.service';
import { PaymentService } from '../shared/payment.service';
import { Delivery } from '../../types/delivery.interface';
import { Product } from '../../types/product.interface';
import { User } from '../../types/user.interface';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatIconModule,RouterLink,MatTableModule,MatIconModule,MatInputModule,MatButtonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

 @ViewChild(MatPaginator) paginator! : MatPaginator 


username : string = ''
orderForm! : FormGroup 
dataSource = new MatTableDataSource<Product>() 
deliveryExists: boolean = false;
deliveryData : Delivery | null = null
productExists: boolean = false;
productData : Product[] = []
displayColumn : string[] = ['userId','title', 'totalPrice', 'status', 'actions'] 
user : User | null = null


constructor(private authService : AuthService, private deliveryService : DeliveryService, private paymentService : PaymentService  , private formBuilder : FormBuilder,)  {}


ngAfterViewInit() : void {
this.dataSource.paginator = this.paginator
}


applyFilter(event:Event) : void {
const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase() 
this.dataSource.filter = filterValue
}





ngOnInit () {
this.authService.getMe().subscribe((user : any) => {
if (user)  {
this.username = user.id
this.elementsForm()
this.getDeliveryData()
this.getProductData()
}
})
}

elementsForm() : void {
  this.orderForm = this.formBuilder.group ({
  name:['', ],
   email:['',],
   phoneNumber:['',],
   address : ['',],
   zipcode : ['',],
   cardNumber : ['',],
  items : ['',],
  total : ['',],
  status : ['',],
 })


}



getDeliveryData(): void {
  console.log('UserId Product Data',this.username)
  this.deliveryService.getDelivery(this.username).subscribe({
    next: (delivery: Delivery | null) => {
      if (delivery) {
        console.log('the delivery data is fetched',delivery)
        this.deliveryData = delivery;
        this.deliveryExists = true;
        this.orderForm.patchValue({
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

getProductData() : void {
console.log('UserId Product Data',this.username)
this.paymentService.getProduct(this.username).subscribe ({
next : (product : Product[]) => {
if(product && product.length > 0) {
console.log('the product data is fetched',product)
this.dataSource.data = product;
this.productExists = true;
}
},
error : (err :any) => {
console.error('Error fetching product details:', err);
},
})
}


deleteProduct (id : string) : void {
  if(confirm('Do you want to delete this product')) {
  this.paymentService.deleteProduct(id).subscribe(() => this.getProductData)
  }
  }


}

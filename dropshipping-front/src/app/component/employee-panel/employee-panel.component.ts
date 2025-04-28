import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../types/user.interface';
import { AuthService } from '../shared/auth.service';
import { PaymentService } from '../shared/payment.service';
import { FormsModule } from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule,} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../types/product.interface';
import { Employee } from '../../types/employee.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-panel',
  standalone: true,
  imports: [CommonModule,MatInputModule,FormsModule, MatButtonModule, MatPaginatorModule,MatSelectModule,MatTableModule],
  templateUrl: './employee-panel.component.html',
  styleUrl: './employee-panel.component.scss'
})
export class EmployeePanelComponent {

@ViewChild(MatPaginator) paginator! : MatPaginator 
dataSource = new MatTableDataSource<Product>() 
employee : Employee[] = []
user : User | null = null 
product : Product[] = []  
displayColumn : string[] = ['userId', 'items', 'title', 'totalPrice', 'status', 'assign', 'actions'] 


constructor(private authService : AuthService, private router : Router, private paymentService : PaymentService) {}  

applyFilter(event:Event) : void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase() 
  this.dataSource.filter = filterValue
  }
  
ngAfterViewInit() : void {
this.dataSource.paginator = this.paginator
}



ngOnInit() : void {
this.authService.getEmployee().subscribe ({
next: (data) => {
if(data?.role !== 'Employee') {
this.router.navigate(['/']) 
return
}
this.user = data 
console.log('Load Employee', this.user)
this.getOrder(this.user.id)

},
error : (error) => {
console.error(error, 'The employee was not found') 
this.router.navigate(['/sign-in']);
}
})
}

changePassword() {
  this.router.navigate(['/verify-email'])
  }
      
  editProfile() {
  this.router.navigate(['/edit-profile'])
  }

  
  getOrder(id: string): void {
    this.paymentService.getOrder(id).subscribe({
      next: (orders: Product[]) => {
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => console.error('Failed to load orders', err)
    });

}

updateStatus(orderId: string, newStatus: 'taken' | 'delivered') {
this.paymentService.updateOrderStatus(orderId, newStatus).subscribe({
next: (res) => {
console.log('Order updated',res)
if (this.user) {
this.getOrder(this.user.id);
} else {
console.error('User is not defined when trying to refresh orders');
}
},
error: (err: any) => console.error('Failed to update status', err)
});
}


}
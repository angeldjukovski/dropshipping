import { Component,ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { PaymentService } from '../shared/payment.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../types/product.interface';
import { User } from '../../types/user.interface';
import { FormsModule } from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule,} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-orders-lists',
  standalone: true,
  imports: [CommonModule,FormsModule,MatInputModule,MatTableModule, MatButtonModule,MatPaginatorModule,MatSelectModule,MatIcon],
  templateUrl: './orders-lists.component.html',
  styleUrl: './orders-lists.component.scss'
})
export class OrdersListsComponent {

  @ViewChild(MatPaginator) paginator! : MatPaginator 

  username : string = '' 
  selectEmployeeId: string = '';
  dataSource = new MatTableDataSource<Product>() 
  displayColumn : string[] = ['userId', 'items', 'title', 'totalPrice', 'status', 'assign', 'actions'] 
  product : Product[] = []  
  user : User | null = null 
  employees : any[] = []
  

  constructor(private authService : AuthService, private payService : PaymentService, private employeeService : EmployeeService, private router : Router )   {}  
  editRowID : string | null = null 
  editedProduct : Partial <Product> = {}   


  ngAfterViewInit() : void {
  this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.authService.getMe().subscribe ({
    next : (data) => {
    if(data?.role !== 'Admin') {
    this.router.navigate(['/'])
    return
    }
    this.user = data 
    },
     
  })
  this.authService.getMe().subscribe((user : any) => {
    if (user)  {
    this.username = user.id
    this.getAllProducts()
    this.getEmployee()
    }
  })
}

applyFilter(event:Event) : void {
const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase() 
this.dataSource.filter = filterValue
}


getAllProducts(): void {
this.payService.getAllProducts().subscribe({
next: (product: Product[]) => {
this.dataSource.data = product
}
})
}

deleteProduct (id : string) : void {
if(confirm('Do you want to delete this product')) {
this.payService.deleteProduct(id).subscribe(() => this.getAllProducts)
}
}

startEdit(product: Product) : void {
this.editRowID = product.userId
this.editedProduct = {...product}
}

cancelEdit() {
this.editRowID = null 
this.editedProduct = {}
}

saveEdit(userId : string)  {
const originalProduct = this.dataSource.data.find(product => product.userId === userId) 
if(!originalProduct) return 
const updatedProduct : Product = {...originalProduct, ...this.editedProduct} 
this.payService.updateProduct(userId,updatedProduct).subscribe(() => {
this.getAllProducts()
this.cancelEdit()
})
}

assignEmployee(orderId : string) {
this.payService.assignOrder(orderId, this.selectEmployeeId, 'Assigned').subscribe(() => {
this.getAllProducts()
this.cancelEdit()
})
}

getEmployee() {
this.employeeService.getAllEmployees().subscribe((res:any) => {
this.employees = res
})
}

usersLists () {
  this.router.navigate(['/users-lists'])
  }

  bookLists () {
    this.router.navigate(['/books-lists'])
  }

  deliveriesLists () {
    this.router.navigate(['/deliveries-lists'])
  }

  adminPanel()  {
  this.router.navigate(['/admin-panel'])
  }

  employeeLists()  {
  this.router.navigate(['employees-list'])
  }



}
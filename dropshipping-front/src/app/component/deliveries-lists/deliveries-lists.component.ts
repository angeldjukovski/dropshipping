import { Component,ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Delivery } from '../../types/delivery.interface';
import { User } from '../../types/user.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule,} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DeliveryService } from '../shared/delivery.service';


@Component({
  selector: 'app-deliveries-lists',
  standalone: true,
  imports: [CommonModule,MatIcon,MatInputModule,MatTableModule, MatButtonModule,MatFormFieldModule,MatSelectModule,MatPaginatorModule,FormsModule],
  templateUrl: './deliveries-lists.component.html',
  styleUrl: './deliveries-lists.component.scss'
})
export class DeliveriesListsComponent {

@ViewChild(MatPaginator) paginator! : MatPaginator 

username : string = ''
dataSource = new MatTableDataSource<Delivery>()
displayColumn : string[] = [ 'userId', 'name', 'email', 'phoneNumber', 'address', 'zipcode', 'deliveryDay', 'deliveryLocation', 'actions' ] 
delivery : Delivery[] = []
user : User | null = null


constructor(private authService : AuthService, private router : Router, private deliveryService : DeliveryService)  {}
editRowID : string | null = null 
editedDelivery : Partial <Delivery> = {}

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
this.getAllDeliveries()
}

applyFilter(event:Event): void {
const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase()
this.dataSource.filter = filterValue
} 

getAllDeliveries(): void {
this.deliveryService.getAllDeliveries().subscribe({
next: (delivery: Delivery[]) => {
this.dataSource.data = delivery
}
})
}

deleteDelivery (id : string) : void {
  if(confirm('Do you want to delete this delivery?')) { 
  this.deliveryService.deleteDelivery(id).subscribe(() => this.getAllDeliveries())
  }
  }


startEdit(delivery: Delivery) : void {
this.editRowID = delivery.userId;
this.editedDelivery = {...delivery}
}

cancelEdit() {
this.editRowID = null 
this.editedDelivery = {}
}

saveEdit(userId: string): void {
  const originalDelivery = this.dataSource.data.find(delivery => delivery.userId === userId);
  if (!originalDelivery) return;
  const updatedDelivery: Delivery = { ...originalDelivery, ...this.editedDelivery };
  this.deliveryService.updateDelivery(userId, updatedDelivery).subscribe(() => {
    this.getAllDeliveries();
    this.cancelEdit();
  });
}


usersLists () {
  this.router.navigate(['/users-lists'])
  }

  bookLists () {
    this.router.navigate(['/books-lists'])
  }

  adminPanel () {
    this.router.navigate(['/admin-panel'])
  }

  ordersLists()  {
  this.router.navigate(['/orders-lists'])
  }

  employeeLists()  {
  this.router.navigate(['employees-list'])
  }




}
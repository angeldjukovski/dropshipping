import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../types/user.interface';
import { AuthService } from '../shared/auth.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule,} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-user-lists',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatIcon, MatPaginatorModule,FormsModule],
  templateUrl: './user-lists.component.html',
  styleUrl: './user-lists.component.scss'
})
export class UserListsComponent {

 @ViewChild(MatPaginator) paginator!: MatPaginator;

 username : string = ''
 dataSource = new MatTableDataSource<User>();
 user : User | null = null;
 displayColumns  : string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'actions']  


 constructor(private authService : AuthService, private router : Router) {}
 editRowID : string | null = null;
 editedUser : Partial <User> = {}

 ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

ngOnInit() : void {
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
    this.getAllUsers()
    }
})
}

applyFilter ( event : Event) : void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue
}

getAllUsers() : void  {
this.authService.findAllUsers().subscribe ({
next: (users: User[]) => {
  this.dataSource.data = users;
}
})
}

deleteUser (id : string) : void {
if(confirm('Do you want to delete this user?')) { 
this.authService.deleteUser(id).subscribe(() => this.getAllUsers())
}
}

startEdit ( user : User): void {
this.editRowID = user.id;
this.editedUser = {}
}

cancelEdit() {
  this.editRowID = null;
  this.editedUser = {};
}

saveEdit ( id : string): void {
const originalUser = this.dataSource.data.find (user => user.id === id)
if(!originalUser) return 
const updatedUser : User = {...originalUser, ...this.editedUser}
this.authService.updateUser(id,updatedUser).subscribe (() => {
this.getAllUsers()
this.cancelEdit()
})
}

adminPanel () {
  this.router.navigate(['/admin-panel'])
  }

  bookLists () {
    this.router.navigate(['/books-lists'])
  }

  deliveriesLists () {
    this.router.navigate(['/deliveries-lists'])
  }

  ordersLists()  {
  this.router.navigate(['/orders-lists'])
  }

  employeeLists()  {
  this.router.navigate(['employees-list'])
  }
    


}
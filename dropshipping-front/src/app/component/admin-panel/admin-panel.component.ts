import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from '../../types/user.interface';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

constructor(private authService : AuthService, private router : Router)  {} 

user: User | null = null

ngOnInit():void {
  this.authService.getAdmin().subscribe ({
    next : (data) => {
    if(data?.role !== 'Admin') {
    this.router.navigate(['/'])
    return
    }
    this.user = data
    },
    error : (error) => {
    console.error(error, 'The admin was not found') 
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

  usersLists () {
  this.router.navigate(['/users-lists'])
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



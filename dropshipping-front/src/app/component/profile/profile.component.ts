import { Component } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { CommonModule } from '@angular/common';
import { User } from '../../types/user.interface';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/auth.service';

import { WishlistComponent } from '../wishlist/wishlist.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, WishlistComponent,MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


constructor (private authService : AuthService, private router : Router) {}

user: User | null = null

ngOnInit():void {
  this.authService.getMe().subscribe ({
  next : (data) => {
  if(!data) {
  this.router.navigate(['/sign-in'])
  return
  }
  if(data.role === 'Admin') {
  this.router.navigate(['/admin-panel']) 
  return
  }
  if(data.role === 'Employee') {
  this.router.navigate(['/employee-panel']) 
  return
 }
 if(data.role === 'Customer') {
 this.user = data 
 return
 }
this.router.navigate(['/sign-in']);
},
})
}



changePassword() {
this.router.navigate(['/verify-email'])
}

editProfile() {
this.router.navigate(['/edit-profile'])
}




}


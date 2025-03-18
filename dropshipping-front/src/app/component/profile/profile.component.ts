import { Component } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { CommonModule } from '@angular/common';
import { User } from '../../types/user.interface';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { OrdersComponent } from '../orders/orders.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, OrdersComponent, WishlistComponent,MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


constructor (private authService : AuthService, private router : Router) {}

user: User | null = null



ngOnInit():void {
this.authService.getMe().subscribe ({
next : (data) => {
this.user = data
},
error : (error) => {
console.error(error, 'The user data was not found')
}
})
}

changePassword() {
this.router.navigate(['/verify-email'])
}

editProfile() {
this.router.navigate(['/edit-profile'])
}

}

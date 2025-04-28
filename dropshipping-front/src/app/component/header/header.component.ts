import { Component, computed,signal } from '@angular/core';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { SignUpComponent } from '../sign-up/sign-up.component';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SearchComponent } from "../search/search.component";
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from "../delivery/delivery.component";
import { ContactComponent } from "../contact/contact.component";
import { BookDetailsComponent } from '../book-details/book-details.component';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../shared/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserRole } from '../../types/user-role.enum';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, NavbarComponent, MatIconModule, MatFormFieldModule, MatToolbar, MatButtonModule, SignUpComponent, SearchComponent, DeliveryComponent, ContactComponent,BookDetailsComponent, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

isLoggedIn = computed(() => this.authService.isAuth())
userRole = computed (() => {
const user = this.authService.currentUser();
return user ? user.role : null;
})



constructor(private authService : AuthService, private router: Router) {}

openAuth() {
  if (this.isLoggedIn()) {
    const user = this.authService.currentUser();
    if (user?.role === 'Admin') {
      this.router.navigate(['/admin-panel']);
  } else if (user?.role === 'Customer') {
    this.router.navigate(['/profile']);
  } else if (user?.role === 'Employee') {
    this.router.navigate(['/employee-panel']);
  }
} else {
this.router.navigate(['/sign-in']);
}
}

logout() {
  this.authService.logout()
  this.router.navigate(['/']);
  }



}
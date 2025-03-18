import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuContent } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { FictionComponent } from '../products/fiction/fiction.component';
import { NonFictionComponent } from "../products/non-fiction/non-fiction.component";
import { ChildrenComponent } from '../products/childrens-literature/childrens-literature.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, MatMenuContent, FictionComponent, NonFictionComponent,ChildrenComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']  
})
export class NavbarComponent {
}


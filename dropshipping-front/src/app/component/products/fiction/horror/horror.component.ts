import { Component,} from '@angular/core';
import { Router, ActivatedRoute, RouterLink,RouterOutlet,} from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { horrorRoute } from './horror.route';




@Component({
  selector: 'app-horror',
  standalone:true,
  imports:[RouterLink,CommonModule,MatMenuModule,MatIconModule,MatButtonModule,MatDividerModule,RouterOutlet,],
  templateUrl: './horror.component.html',
  styleUrl:  './horror.component.scss'
})
export class HorrorComponent {
 

  dropdownVisible = false;

  constructor(private router: Router, private route : ActivatedRoute) {}
  
  navigator(path:string):void {
    this.router.navigate([path], {relativeTo:this.route})
    
    
    }

}



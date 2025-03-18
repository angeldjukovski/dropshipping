import { Component, HostListener } from '@angular/core';
import { RouterLink,Router,ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BookGenre } from '../../../types/book.interface';
import { fictionRoutes } from './fiction.routes';


@Component({
  selector: 'app-fiction',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatMenuModule,RouterLink,RouterOutlet],
  templateUrl: './fiction.component.html',
  styleUrl: '../products.component.scss'
})
export class FictionComponent {
openDropDown =false
bookgenre: BookGenre[] = [
    {name:"Fiction", path: 'genre',
    items: [
      {name:"Fantasy", path:"fantasy"},
      {name: "Adventure", path:"adventure"},
      {name: "Sagas", path:"sagas"},
      {name: "Myths & Legends", path:"myths"},
      {name:"Sci-FI", path:"sci-fi"},
      {name:"Utopia", path:"utopia"},
    ],
  },
  {name:"General Literary", path:"genre",
  items: [
    {name: "Classics", path:'classics'},
    {name:"Romance", path:'romance'},
    {name: "Comic & Manga", path:"comics"},
    {name: "Spiritual", path:"spiritual"},
  ],
  },
  {name: 'Horror & Mystery', path: 'genre',
  items: [
    {name: "Mystery", path:"mystery"},
    {name:"Dystopia", path:'dystopia'},
    {name:"Dark & Fantasy",path:"dark-fantasy"},
    {name:"Thriller", path:"thriller"},
    {name:"Horror", path:"horror"},
  ],
  }
  ]

constructor(private router:Router,private activatedRoute:ActivatedRoute) {}

toggleDropdown(event:Event) {
  event.stopPropagation()
  this.openDropDown = !this.openDropDown
  }
  closeDropDown() {
  this.openDropDown = false
  }



navigator(path:string): void {
this.router.navigate([path,{relativeTo:this.activatedRoute}] )
}

@HostListener('document:click', ['$event'])
closeDrop(event:Event) {
const targetElement  = event.target as HTMLElement
if(!targetElement.closest ('.dropdown_genre')) {
this.openDropDown = false
}
}

}


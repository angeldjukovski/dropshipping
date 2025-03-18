import { Component,HostListener } from '@angular/core';
import { Router,ActivatedRoute,RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BookGenre } from '../../../types/book.interface';
import { childrenLiteratureRoutes } from './childrens-literature.routes';




@Component({
  selector: 'app-children',
  standalone: true,
  imports: [RouterLink,CommonModule,MatButtonModule,MatMenuModule,RouterOutlet],
  templateUrl: './childrens-literature.component.html',
  styleUrl: '../products.component.scss'
})
export class ChildrenComponent {
openDropDown = false;
bookgenre:BookGenre[] = [
{name: "Children's Literature", path: 'genre',
items: [
{name:"Fables", path:'fables'} ,
{name:"Fairy Tales", path:"fairy-tales"}, 
{name:"Humorous Childrens Books", path:"humorous-children"},
{name: "Fantasy for Children", path:'fantsy-children'},
{name:"Interactive Books", path:"interactive-books"},
{name:"Picture Books", path:"picture-book"},
{name:"Puzzle Books", path:"puzzle-book"},  
{name: "Board Games", path: "board"}
]
},


]
constructor(private router : Router, private activateRouter : ActivatedRoute)  {}

toggleDropdown(event:Event) {
  this.openDropDown = !this.openDropDown
  event.stopPropagation()
  }
  closeDropDown() {
  this.openDropDown = false
  }

navigator(path:string):void {
this.router.navigate([path,{relativeTo:this.activateRouter}])
}

@HostListener('document:click', ['$event'])
closeDrop(event:Event) {
const targetElement = event.target as HTMLElement
if(!targetElement.closest ('.dropdown_genre')) {
this.openDropDown = false
}
}

}
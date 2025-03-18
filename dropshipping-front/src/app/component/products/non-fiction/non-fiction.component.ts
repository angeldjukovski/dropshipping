import { CommonModule } from '@angular/common';
import { Component,HostListener } from '@angular/core';
import { BookGenre } from '../../../types/book.interface';
import { RouterLink,Router,ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { nonFictionRoutes } from './non-fiction.routes';

@Component({
  selector: 'app-non-fiction',
  standalone: true,
  imports : [CommonModule,RouterLink,MatButtonModule,RouterOutlet],
  templateUrl: './non-fiction.component.html',
  styleUrl: '../products.component.scss'
})
export class NonFictionComponent {
openDropDown = false
bookgenre: BookGenre[] = [
{name: "Non-Fiction", path:"genre",
items: [
{name: "Architecture", path:'architecture'},
{name: "Art & Fashion", path:'art-fashion'},
{name: "Biography", path: 'biography'},
{name: "Cooking", path: 'cooking'},
{name: "Gardenig", path: 'garden'},
{name: "Music",path:'music'},
{name: "Poetry", path: "potery"},
{name: "Quiz", path: "quiz"},
{name: "Sports", path: "sports"},
{name: "Transport", path: "transport"},
{name: "Travel & Maps", path: "travel-maps"},
{name: "True & Crime", path: "true-crime"},
{name: "Tech", path: "tech"}
],
},
{name:"Education & Science", path: "genre" ,
items: [
{name: "Business & Law", path:'business-law'},
{name: "Computing & IT", path: "computing-it"},
{name: "History",path:'history'},
{name: "Languages",path: 'languages'},
{name: "Psychology", path: "psychology"},
{name: "Philosophy & Theology", path: "philosophy-theology"},
{name: "Science & Geography", path: "science-geography"},
{name: "Science & Mathematics", path: "science-mathmetics"},
{name: "Sociology & Politics", path: "sociology-politics"},
{name: "Encyclopedias",path: "encyclopedias"}
]
}
]
constructor(private router:Router,private actuvatedRoute:ActivatedRoute) {}
toggleDropdown(event:Event) {
this.openDropDown = !this.openDropDown
event.stopPropagation()
}
closeDropDown() {
this.openDropDown = false
}
navigator(path:string): void {
this.router.navigate([path,{relativeTo:this.actuvatedRoute}] )
}

@HostListener('document:click', ['$event'])
closeDrop(event:Event) {
const targetElement = event.target as HTMLElement
if(!targetElement.closest('.dropdown_genre')) {
this.openDropDown = false
}
}

}


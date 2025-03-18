import { Routes } from "@angular/router";
import { GenreComponent } from "../genre/genre.component";

export const fictionRoutes : Routes = [
{path:"book", 
children : [
{path: ':genre', component : GenreComponent}
]
},
{path:"general-genre", 
children : [
{path: ':genre', component : GenreComponent}
]
},
{path:"horror-mystery", 
children : [
{path: ':genre', component : GenreComponent}
]
},

]
import { Routes } from "@angular/router";
import { GenreComponent } from "../genre/genre.component";



export const  childrenLiteratureRoutes: Routes  = [
    {path:"children-literature",
    children: [
    {path: ':genre', component: GenreComponent}
    ]
}
]
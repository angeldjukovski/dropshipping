import { Routes } from "@angular/router";
import { GenreComponent } from "../genre/genre.component";

export const nonFictionRoutes : Routes = [
    { path: "non-fiction",
    children: [
    {path: ':genre', component : GenreComponent}
    ]
    },
    
    {path:"education-science",
    children: [
    {path: ':genre', component : GenreComponent}    
    ]
}
]
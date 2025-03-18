import { Routes } from "@angular/router";
import { CosmicHorrorComponent } from "./cosmic-horror/cosmic-horror.component";
import { GothicHorrorComponent } from "./gothic-horror/gothic-horror.component";
import { OccultHorrorComponent } from "./occult-horror/occult-horror.component";
import { PsychologicalHorrorComponent } from "./psychological-horror/psychological-horror.component";
import { SciFiHorrorComponent } from "./sci-fi-horror/sci-fi-horror.component";
import { SurvivalHorrorComponent } from "./survival-horror/survival-horror.component";

export const horrorRoute: Routes = [
{path:'cosmic',component:CosmicHorrorComponent},
{path:"gothic",component:GothicHorrorComponent},
{path: "occult",component:OccultHorrorComponent},
{path: "psychology",component:PsychologicalHorrorComponent},
{path: "sci-fi",component:SciFiHorrorComponent},
{path: "survival",component:SurvivalHorrorComponent}

]
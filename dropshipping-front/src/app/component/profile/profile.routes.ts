import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { OrdersComponent } from "../orders/orders.component";
import { WishlistComponent } from "../wishlist/wishlist.component";

export const profileRoutes : Routes = [
{path:"profile", component : ProfileComponent,
children: [
{path: 'order', component : OrdersComponent},
{path: 'wishlist', component : WishlistComponent}
]
}

]
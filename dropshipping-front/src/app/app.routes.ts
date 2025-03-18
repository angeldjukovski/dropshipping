
import { Routes } from '@angular/router';
import { ContactComponent } from './component/contact/contact.component';
import { HomeComponent } from './component/home/home.component';
import { SaleComponent } from './component/sale/sale.component';
import { CartComponent } from './component/cart/cart.component';
import { SearchComponent } from './component/search/search.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { DeliveryComponent } from './component/delivery/delivery.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';
import { NonFictionComponent } from './component/products/non-fiction/non-fiction.component';
import { FictionComponent } from './component/products/fiction/fiction.component';
import { ChildrenComponent } from './component/products/childrens-literature/childrens-literature.component';
import { fictionRoutes } from './component/products/fiction/fiction.routes';
import { nonFictionRoutes } from './component/products/non-fiction/non-fiction.routes';
import { childrenLiteratureRoutes } from './component/products/childrens-literature/childrens-literature.routes';
import { BookDataComponent } from './component/products/book-data/book-data.component';
import { bookRoutes } from './component/products/book-data/book-data.route';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HeaderComponent } from './component/header/header.component';
import { OrdersComponent } from './component/orders/orders.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { profileRoutes } from './component/profile/profile.routes';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { CheckoutComponent } from './component/checkout/checkout.component';



export const routes: Routes = [

{path:'',component:HomeComponent},
{path:'sale',component:SaleComponent}, 
{path:'cart',component:CartComponent}, 
{path:'search',component:SearchComponent},
{path:'sign-in',component:SignInComponent},
{path:'api/auth/forgot-password',component:ForgotPasswordComponent},
{path:'verify-email',component:VerifyEmailComponent},
{path: 'api/user/_id/edit-profile', component : EditProfileComponent},
{path:'register',component:SignUpComponent},
{path:'contact',component:ContactComponent},
{path:'delivery',component:DeliveryComponent},
{path: 'book-details/:id', component: BookDetailsComponent},
{path: 'non-fiction', component: NonFictionComponent, children: nonFictionRoutes},
{path: 'fiction', component: FictionComponent,children:fictionRoutes},
{path: 'children-literature', component: ChildrenComponent,children: childrenLiteratureRoutes},
{path: '', component: BookDataComponent},
{path: 'genre/:genre', component: BookDataComponent},
{path: 'header', component: HeaderComponent},
{path : 'profile', component: ProfileComponent},
{path : 'orders', component: OrdersComponent},
{path : 'wishlist', component: WishlistComponent},
{path: 'checkout', component: CheckoutComponent},
{path: 'edit-profile', component: EditProfileComponent},

];

